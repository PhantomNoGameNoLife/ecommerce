import * as z from "zod";

export const forgotSchema = z.object({
  email: z.email("Invalid email address"),
})

export type ForgotSchemaType = z.infer<typeof forgotSchema>