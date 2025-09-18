import * as z from "zod";

export const changeSchema = z.object({
  currentPassword: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      "Current Password must be at least 6 characters and contain both letters and numbers"
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      "Password must be at least 6 characters and contain both letters and numbers"
    ),
  rePassword: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      "Confirm Password must follow the same rules"
    ),
}).refine(
  (obj) => obj.password === obj.rePassword,
  {
    path: ["rePassword"],
    message: "Passwords do not match",
  }
);

export type ChangeSchemaType = z.infer<typeof changeSchema>;