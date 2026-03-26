import type { PaginatedResponse } from "@/types";
import type { BloodType } from "@/types/blood-type";
import type { Antibody } from "@/types/anti-body";
import type { User } from "@/types/user";

export type Sex = "male" | "female";

export type Patient = {
  id: number;
  mrn: string;
  fname: string;
  lname: string;
  date_of_birth: string;
  sex: Sex;
  blood_type: BloodType;
  anti_a: Antibody;
  anti_b: Antibody;
  anti_d: Antibody;
  age: number;
};

export type BloodUnit = {
  barcode: string;
  blood_type: BloodType;
  id: number;
};

export type CrossMatch = {
  id: number;
  blood_unit: BloodUnit;
  patient: Patient;
  final_result: string;
  signed_at: string | null;
  signed_by_employee: {
    id: number;
    fname: string;
    lname: string;
  } | null;
};

export type PaginatedCrossMatchesResponse = PaginatedResponse<CrossMatch>;

export * from "../schema/create-cross-matches.schema";
export * from "../schema/edit-cross-matches.schema";
