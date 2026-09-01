import { z } from "zod";

/**
 * Normalizes roll number to uppercase trimmed string
 */
export const rollNumberSchema = z
  .string()
  .min(1, "Roll number is required")
  .max(64, "Roll number is too long")
  .transform((val) => val.trim().toUpperCase());

/**
 * Normalizes name to uppercase trimmed string
 */
export const studentNameSchema = z
  .string()
  .min(1, "Student name is required")
  .max(128, "Student name is too long")
  .transform((val) => val.trim().toUpperCase());

/**
 * Gender validation ('M' or 'F' only)
 */
export const genderSchema = z.enum(["M", "F"], {
  errorMap: () => ({ message: "Gender must be 'M' or 'F'" }),
});

/**
 * Auth Login Schema
 */
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
  password: z.string().min(1, "Password is required"),
});

/**
 * Single Student Record Schema
 */
export const studentRecordSchema = z.object({
  rollNumber: rollNumberSchema,
  name: studentNameSchema,
  gender: genderSchema,
});

/**
 * Single Participation Entry Schema
 */
export const eventEntrySchema = z.object({
  sportId: z.string().min(1, "Sport ID is required").trim().toLowerCase(),
  eventId: z.string().min(1, "Event ID is required").trim().toLowerCase(),
  gender: z.enum(["M", "F", "mixed"], {
    errorMap: () => ({ message: "Event gender must be 'M', 'F', or 'mixed'" }),
  }),
  rollNumber: rollNumberSchema,
  isReserve: z.boolean().default(false),
});

/**
 * Contact Details Schema
 */
export const contactDetailsSchema = z.object({
  contactName: z.string().min(1, "Contact person name is required").trim(),
  contactEmail: z.string().email("Invalid contact email address").trim(),
  contactPhone: z.string().min(6, "Valid contact phone is required").trim(),
  notes: z.string().max(1000).optional().default(""),
});

/**
 * Full Registration Submission Payload Schema
 */
export const registrationSubmitSchema = z.object({
  contactDetails: contactDetailsSchema,
  students: z.array(studentRecordSchema).min(1, "At least one student must be registered"),
  entries: z.array(eventEntrySchema).min(1, "At least one event entry must be submitted"),
});
