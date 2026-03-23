import { z } from "zod";

export const createPatientSchema = z.object({
  mrn: z.string().min(1, "MRN is required").max(50),
  fname: z.string().min(1, "First Name is required").max(50),
  lname: z.string().min(1, "Last Name is required").max(50),
  date_of_birth: z.string().min(1, "Date of Birth is required").max(255),
  sex: z.string().min(1, "Sex is required").max(255),
  blood_type: z.string().min(1, "Blood Type is required").max(255),
  anti_a: z.string().min(1, "Anti A is required").max(255),
  anti_b: z.string().min(1, "Anti B is required").max(255),
  anti_d: z.string().min(1, "Anti D is required").max(255),
});

export type CreatePatientValues = z.infer<typeof createPatientSchema>;
