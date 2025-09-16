import * as z from "zod";

export const paymentSchema = z.object({
  phone: z.string().regex(/^01[0-2,5][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(4, "City must be at least 4 characters"),
  details: z.string().min(6, "Details must be at least 6 characters"),
});

export type PaymentSchemaType = z.infer<typeof paymentSchema>;