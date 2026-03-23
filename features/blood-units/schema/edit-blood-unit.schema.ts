import { z } from "zod";

export const editBloodUnitSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  blood_type: z.string().min(1, "Blood type is required"),
});

export type EditBloodUnitValues = z.infer<typeof editBloodUnitSchema>;
