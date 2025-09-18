import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/,"Password must be at least 6 characters and contain both letters and numbers"),
})

export type LoginSchemaType = z.infer<typeof loginSchema>