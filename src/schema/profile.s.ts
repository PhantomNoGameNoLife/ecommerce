import * as z from "zod";

export const profileSchema = z.object({
  avatar: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
  name: z.string()
    .min(4, "Name must be at least 4 characters")
    .max(40, "Name must not exceed 40 characters"),
  phone: z.string()
    .regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid 11-digit Egyptian number"),
  addressName: z.union([z.string().min(2, "Address name must be at least 2 characters"), z.literal("")]).optional(),
  addressPhone: z.union([
    z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid 11-digit Egyptian number"),
    z.literal(""),
  ]).optional(),
  addressCity: z.union([z.string().min(2, "City must be at least 2 characters"), z.literal("")]).optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>