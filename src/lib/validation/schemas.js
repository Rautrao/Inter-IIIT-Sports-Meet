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
 * Payment Details Schema
 */
export const paymentDetailsSchema = z.object({
  transactionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Transaction date must be in YYYY-MM-DD format").refine((val) => {
    const date = new Date(val);
    if (isNaN(date.getTime())) return false; // Not a valid calendar date
    const today = new Date();
    // Allow dates up to the end of today
    today.setHours(23, 59, 59, 999);
    return date <= today;
  }, "Transaction date cannot be in the future or invalid"),
  transactionId: z.string().min(5, "Transaction ID/UTR must be at least 5 characters").max(64),
  bankName: z.string().max(128).optional().nullable(),
  paymentMode: z.enum(["NEFT", "RTGS", "IMPS", "UPI", "OTHER"], {
    errorMap: () => ({ message: "Payment Mode must be NEFT, RTGS, IMPS, UPI, or OTHER" }),
  }),
  otherPaymentMode: z.string().max(128).optional().nullable(),
  proofPathname: z.string().min(5, "Payment proof is required"),
}).refine((data) => {
  if (data.paymentMode === "OTHER") {
    return data.otherPaymentMode && data.otherPaymentMode.trim().length > 0;
  }
  return true;
}, {
  message: "Other Payment Mode is required when Payment Mode is OTHER",
  path: ["otherPaymentMode"]
});

/**
 * Full Registration Submission Payload Schema
 */
export const registrationSubmitSchema = z.object({
  contactDetails: contactDetailsSchema,
  students: z.array(studentRecordSchema).min(1, "At least one student must be registered"),
  entries: z.array(eventEntrySchema).min(1, "At least one event entry must be submitted"),
});

/**
 * Payment Submission Payload Schema
 */
export const paymentSubmitSchema = z.object({
  paymentDetails: paymentDetailsSchema,
});
