import { eq } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { users, registrations, students, studentEventParticipations } from "../../db/schema.js";
import { registrationSubmitSchema } from "../validation/schemas.js";
import { validateRegistrationRules } from "../validation/rules.js";

/**
 * Fetch submitted registration state and entries for an IIIT.
 * If the IIIT has not submitted, returns an empty non-submitted state.
 * (Unsubmitted drafts exist solely in client browser localStorage)
 */
export async function getRegistrationForIIIT(iiitCode) {
  const db = getDb();

  // Find submitted registration record
  const regList = await db
    .select()
    .from(registrations)
    .where(eq(registrations.iiitCode, iiitCode))
    .limit(1);

  if (regList.length === 0) {
    return {
      submitted: false,
      isLocked: false,
      registration: null,
      students: [],
      entries: [],
    };
  }

  const reg = regList[0];

  // Fetch students
  const studentList = await db
    .select()
    .from(students)
    .where(eq(students.registrationId, reg.id));

  // Fetch entries
  const participationList = await db
    .select({
      id: studentEventParticipations.id,
      sportId: studentEventParticipations.sportId,
      eventId: studentEventParticipations.eventId,
      gender: studentEventParticipations.gender,
      isReserve: studentEventParticipations.isReserve,
      studentId: studentEventParticipations.studentId,
      studentName: students.name,
      rollNumber: students.rollNumber,
      studentGender: students.gender,
    })
    .from(studentEventParticipations)
    .innerJoin(students, eq(studentEventParticipations.studentId, students.id))
    .where(eq(studentEventParticipations.registrationId, reg.id));

  return {
    submitted: true,
    isLocked: true,
    registration: reg,
    students: studentList,
    entries: participationList,
  };
}

/**
 * Authoritatively validate and submit registration within a single database transaction.
 * Permanently locks the registration.
 */
export async function submitRegistration(iiitCode, rawPayload, username) {
  const db = getDb();

  // 1. Zod input validation
  const parsed = registrationSubmitSchema.safeParse(rawPayload);
  if (!parsed.success) {
    const error = new Error("Invalid registration submission data format");
    error.statusCode = 400;
    error.details = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`);
    throw error;
  }

  const payload = parsed.data;

  // 2. Business rules validation
  const ruleResult = validateRegistrationRules(payload);
  if (!ruleResult.isValid) {
    const error = new Error("Registration business rules validation failed");
    error.statusCode = 422;
    error.details = ruleResult.errors;
    throw error;
  }

  // 3. Check if that IIIT has already submitted
  const existingRegList = await db
    .select()
    .from(registrations)
    .where(eq(registrations.iiitCode, iiitCode))
    .limit(1);

  if (existingRegList.length > 0) {
    const error = new Error(
      "Registration is locked. For corrections, contact IIITDM Kancheepuram Sports Cell."
    );
    error.statusCode = 403;
    throw error;
  }

  // 4. Retrieve official IIIT Name from users table
  const userList = await db
    .select({ iiitName: users.iiitName })
    .from(users)
    .where(eq(users.iiitCode, iiitCode))
    .limit(1);

  const iiitName = userList[0]?.iiitName || iiitCode;

  // 5. Execute atomic database transaction
  const result = await db.transaction(async (tx) => {
    // Insert new submitted registration
    const [insertedReg] = await tx
      .insert(registrations)
      .values({
        iiitCode,
        iiitName,
        status: "submitted",
        submittedAt: new Date(),
        submittedBy: username,
        contactName: payload.contactDetails.contactName,
        contactEmail: payload.contactDetails.contactEmail,
        contactPhone: payload.contactDetails.contactPhone,
        notes: payload.contactDetails.notes || null,
        totalStudentsCount: payload.students.length,
      })
      .returning();

    const regId = insertedReg.id;

    // Insert student roster
    const studentRows = payload.students.map((s) => ({
      registrationId: regId,
      iiitCode,
      rollNumber: s.rollNumber,
      name: s.name,
      gender: s.gender,
    }));

    const insertedStudents = await tx
      .insert(students)
      .values(studentRows)
      .returning();

    // Map rollNumber -> studentId
    const rollToIdMap = new Map();
    for (const s of insertedStudents) {
      rollToIdMap.set(s.rollNumber, s.id);
    }

    // Insert event participations
    const participationRows = payload.entries.map((entry) => {
      const studentId = rollToIdMap.get(entry.rollNumber);
      if (!studentId) {
        throw new Error(`Internal error mapping student roll number: ${entry.rollNumber}`);
      }
      return {
        registrationId: regId,
        studentId,
        sportId: entry.sportId,
        eventId: entry.eventId,
        gender: entry.gender,
        isReserve: entry.isReserve,
      };
    });

    await tx.insert(studentEventParticipations).values(participationRows);

    return {
      registrationId: regId,
      iiitCode,
      iiitName,
      status: "submitted",
      isLocked: true,
      totalStudentsCount: payload.students.length,
      totalEntriesCount: payload.entries.length,
      submittedAt: new Date().toISOString(),
    };
  });

  return result;
}
