import * as z from "zod";

export const verifySchema = z.object({
  resetCode: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type VerifySchemaType = z.infer<typeof verifySchema>;