import { validateRegistrationRules } from "../validation/rules.js";
import { GLOBAL_RULES } from "../sports/config.js";
import { registrationSubmitSchema } from "../validation/schemas.js";

/**
 * Parses a slot key into its components
 * Format: sportId|eventId|eventGender|role|index
 */
export function parseSlotKey(key) {
  const parts = key.split("|");
  if (parts.length !== 5) return null;
  return {
    sportId: parts[0],
    eventId: parts[1],
    eventGender: parts[2],
    role: parts[3], // 'main' or 'reserve'
    index: parseInt(parts[4], 10),
  };
}

/**
 * Generates a slot key
 */
export function getSlotKey(sportId, eventId, eventGender, role, index) {
  return `${sportId}|${eventId}|${eventGender}|${role}|${index}`;
}

/**
 * Transforms flat form state into the backend submission payload
 *
 * @param {Object} contactDetails
 * @param {Object} slotsMap - { [slotKey]: { rollNumber, name, gender } }
 * @returns {Object} payload { contactDetails, students, entries }
 */
export function buildSubmissionPayload(contactDetails, slotsMap) {
  const studentsMap = new Map();
  const entries = [];

  for (const [key, slotData] of Object.entries(slotsMap)) {
    if (!slotData || !slotData.rollNumber) continue;

    const roll = slotData.rollNumber.trim().toUpperCase();
    if (!roll) continue;

    const name = (slotData.name || "").trim().toUpperCase();
    const gender = slotData.gender || "M";

    if (!studentsMap.has(roll)) {
      studentsMap.set(roll, { rollNumber: roll, name, gender });
    }

    const parsed = parseSlotKey(key);
    if (!parsed) continue;

    entries.push({
      sportId: parsed.sportId,
      eventId: parsed.eventId,
      gender: parsed.eventGender,
      rollNumber: roll,
      isReserve: parsed.role === "reserve",
    });
  }

  return {
    contactDetails,
    students: Array.from(studentsMap.values()),
    entries,
  };
}

/**
 * Gets student registry (unique students and their details) from current slots
 */
export function getStudentRegistry(slotsMap) {
  const registry = new Map();
  for (const slotData of Object.values(slotsMap)) {
    if (!slotData || !slotData.rollNumber) continue;
    const roll = slotData.rollNumber.trim().toUpperCase();
    if (roll) {
      if (!registry.has(roll)) {
        registry.set(roll, {
          rollNumber: roll,
          name: slotData.name,
          gender: slotData.gender,
        });
      } else {
        // Update name/gender if it was empty previously and now provided
        const existing = registry.get(roll);
        if (!existing.name && slotData.name) {
           existing.name = slotData.name;
        }
      }
    }
  }
  return registry;
}

/**
 * Analyzes form state and returns live validation errors
 */
export function getLiveValidationErrors(contactDetails, slotsMap) {
  const payload = buildSubmissionPayload(contactDetails, slotsMap);
  const errors = [];

  // 1. Check if over 150 unique students
  if (payload.students.length > GLOBAL_RULES.MAX_UNIQUE_STUDENTS_PER_IIIT) {
    errors.push(`Maximum ${GLOBAL_RULES.MAX_UNIQUE_STUDENTS_PER_IIIT} unique students allowed. You have ${payload.students.length}.`);
  }

  // 2. Check for conflicting names for the same roll number
  const nameMap = new Map();
  for (const [key, slotData] of Object.entries(slotsMap)) {
    if (!slotData || !slotData.rollNumber) continue;
    const roll = slotData.rollNumber.trim().toUpperCase();
    const name = (slotData.name || "").trim().toUpperCase();
    if (roll && name) {
      if (nameMap.has(roll) && nameMap.get(roll) !== name) {
        errors.push(`Conflicting names for roll number ${roll}: "${nameMap.get(roll)}" vs "${name}"`);
      }
      nameMap.set(roll, name);
    }
  }

  // 3. Use the authoritative business rules
  if (payload.entries.length > 0) {
    const ruleResult = validateRegistrationRules(payload);
    if (!ruleResult.isValid) {
      errors.push(...ruleResult.errors);
    }
  }

  // 4. Validate schema (contact details, missing fields, etc)
  const parsed = registrationSubmitSchema.safeParse(payload);
  if (!parsed.success) {
    parsed.error.issues.forEach(issue => {
      errors.push(`${issue.path.join(".")}: ${issue.message}`);
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    payload,
    totalUniqueStudents: payload.students.length
  };
}

/**
 * Formats raw validation error strings into short, single-line messages.
 */
export function formatValidationError(raw) {
  if (!raw) return "";

  // Contact details Zod schema paths
  if (raw.includes("contactDetails.contactName") || raw.includes("contactName")) {
    return "Contact Name: Faculty in-charge name required";
  }
  if (raw.includes("contactDetails.contactEmail") || raw.includes("contactEmail")) {
    return "Contact Email: Valid email required (e.g. sports@iiit.ac.in)";
  }
  if (raw.includes("contactDetails.contactPhone") || raw.includes("contactPhone")) {
    return "Contact Phone: Phone number required";
  }

  // Student roster schema & business rule paths
  if (raw.includes("At least one student must be registered") || raw.includes("students: At least one student")) {
    return "Roster: At least 1 student required";
  }
  if (raw.includes("Maximum 150 unique students allowed") || raw.includes("Maximum unique students limit exceeded")) {
    const match = raw.match(/\d+/g);
    if (match && match.length >= 2) {
      return `Roster: Max 150 unique students limit exceeded (${match[1]} entered)`;
    }
    return "Roster: Max 150 unique students limit exceeded";
  }
  if (raw.includes("Duplicate student roll number detected")) {
    const roll = raw.split(":").pop()?.trim() || "";
    return `Roster: Duplicate roll number ${roll}`;
  }
  if (raw.includes("Conflicting names for roll number")) {
    const match = raw.match(/roll number ([\w-]+)/i);
    const roll = match ? match[1] : "";
    return `Roster: Conflicting names for roll ${roll}`;
  }

  // Gender mismatch
  if (raw.toLowerCase().includes("gender mismatch")) {
    const match = raw.match(/Student (.*?) \((.*?)\) is (.*?) but registered in (.*)/i);
    if (match) {
      return `Gender Mismatch: ${match[2]} (${match[1]}) in ${match[4]}`;
    }
    return raw.replace(/Gender mismatch:\s*/i, "Gender Mismatch: ");
  }

  // Squad size
  if (raw.toLowerCase().includes("squad size exceeded")) {
    const match = raw.match(/squad size exceeded for (.*?): (\d+) .*?\(maximum limit is (\d+)\)/i);
    if (match) {
      return `Limit Exceeded: ${match[1]} (${match[2]}/${match[3]} max)`;
    }
  }

  // Clean fallback
  return raw
    .replace(/^students[:\.]\s*/i, "Roster: ")
    .replace(/^entries[:\.]\s*/i, "Events: ")
    .replace(/^contactDetails[:\.]\s*/i, "Contact: ")
    .trim();
}
