import type { PaginatedResponse } from "@/types";
import type { BloodType } from "@/types/blood-type";
import type { Antibody } from "@/types/anti-body";

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

export type PaginatedPatientsResponse = PaginatedResponse<Patient>;

export * from "../schema/create-patients.schema";
export * from "../schema/edit-patients.schema";
