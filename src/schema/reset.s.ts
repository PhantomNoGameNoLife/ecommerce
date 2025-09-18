import * as z from "zod";

export const resetSchema = z.object({
  email: z.email("Invalid email address"),
  newPassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/,"Password must be at least 6 characters and contain both letters and numbers"),
})

export type ResetSchemaType = z.infer<typeof resetSchema>