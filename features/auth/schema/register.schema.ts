import { z } from "zod";

export const registerSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  password: z.string().min(2, "Password must be at least 2 characters"),
  signature_code: z.string().min(1, "Signature code is required"),
});

export type RegisterData = z.infer<typeof registerSchema>;
