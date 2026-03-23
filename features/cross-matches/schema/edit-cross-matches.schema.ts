import { z } from "zod";

export const editCrossMatchSchema = z.object({
  final_result: z.enum(["Compatible", "Incompatible", "Pending"], {
    message: "Invalid result value",
  }),
});

export type EditCrossMatchValues = z.infer<typeof editCrossMatchSchema>;
