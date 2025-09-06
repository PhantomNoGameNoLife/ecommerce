import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters").max(20, "Name must not exceed 20 characters"),
  email: z.email("Invalid email address"),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,"Password must be at least 6 characters and contain both letters and numbers"),
  rePassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,"Confirm Password must follow the same rules"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number must be 11 digits"),
}).refine((obj)=>{
    if(obj.password === obj.rePassword) return true;
    return false;
},{
    path:['rePassword'],
    error:"Passwords do not match"
});

export type RegisterSchemaType = z.infer<typeof registerSchema>