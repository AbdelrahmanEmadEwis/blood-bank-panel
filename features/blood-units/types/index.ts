import type { PaginatedResponse } from "@/types";
import type { CrossMatch } from "../../cross-matches/types";

export type BloodUnit = {
  id: number;
  barcode: string;
  blood_type: string;
};

export type BloodUnitDetail = BloodUnit & {
  cross_matches: CrossMatch[];
};

export type PaginatedBloodUnitsResponse = PaginatedResponse<BloodUnit>;

export * from "../schema/create-blood-unit.schema";
export * from "../schema/edit-blood-unit.schema";
