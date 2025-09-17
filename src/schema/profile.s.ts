import * as z from "zod";

export const profileSchema = z.object({
  avatar: z.url("Avatar is required"),

  name: z.string()
    .min(4, "Name must be at least 4 characters")
    .max(40, "Name must not exceed 40 characters"),

  email: z.email("Invalid email address"),

  phone: z.string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid phone number must be 11 digits"),

  addressName: z.string().min(2, "Address name is required"),
  addressPhone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number must be 11 digits"),
  addressCity: z.string().min(2, "City is required"),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;