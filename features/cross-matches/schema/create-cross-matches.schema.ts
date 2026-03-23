import { z } from "zod";

export const createCrossMatchSchema = z.object({
  patient_id: z.coerce.number().min(1, "Patient is required"),
  blood_unit_id: z.coerce.number().min(1, "Blood Unit is required"),
});

export type CreateCrossMatchValues = z.infer<typeof createCrossMatchSchema>;
