import { z } from "zod";

export const createPatientSchema = z.object({
  mrn: z.string().min(1, "MRN is required").max(50),
  fname: z.string().min(1, "First Name is required").max(50),
  lname: z.string().min(1, "Last Name is required").max(50),
  date_of_birth: z.string().min(1, "Date of Birth is required").max(255),
  sex: z.enum(["male", "female"], {
    message: "Sex must be male or female",
  }),
  blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    message: "Invalid blood type",
  }),
  anti_a: z.enum(["pos", "neg", "nd"], {
    message: "Must be pos, neg, or nd",
  }),
  anti_b: z.enum(["pos", "neg", "nd"], {
    message: "Must be pos, neg, or nd",
  }),
  anti_d: z.enum(["pos", "neg", "nd"], {
    message: "Must be pos, neg, or nd",
  }),
});

export type CreatePatientValues = z.infer<typeof createPatientSchema>;
