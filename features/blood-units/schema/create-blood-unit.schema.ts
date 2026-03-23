import { z } from "zod";

export const createBloodUnitSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  blood_type: z.string().min(1, "Blood type is required"),
});

export type CreateBloodUnitValues = z.infer<typeof createBloodUnitSchema>;
