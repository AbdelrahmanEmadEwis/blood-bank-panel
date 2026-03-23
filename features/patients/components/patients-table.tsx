"use client";

import { DataTable } from "@/components/shared";
import { getAllPatientsAction, columns, type Patient } from "@/features/patients";
import { useDataTable } from "@/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PatientsTableFilter } from "./patients-table-filter";

type PatientsFilters = {
  search?: string;
};

export function PatientsTable() {
  const { table, isLoading, filters, setFilters } = useDataTable<Patient, PatientsFilters>({
    columns,
    fetchAction: getAllPatientsAction,
    initialFilters: { search: "" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-500">Manage all patients information.</p>
        </div>

        <Link
          href="/dashboard/patients/create"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          Add Patient
        </Link>
      </div>

      <DataTable table={table} isLoading={isLoading}>
        <PatientsTableFilter filters={filters} setFilters={setFilters} />
      </DataTable>
    </div>
  );
}
