"use client";

import { DataTable } from "@/components/shared";
import { getAllBloodUnitsAction, columns, type BloodUnit } from "@/features/blood-units";
import { useDataTable } from "@/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BloodUnitsTableFilter } from "./blood-units-table-filter";
import { Button } from "@/components/ui/button";

type BloodUnitsFilters = {
  search?: string;
};

export function BloodUnitsTable() {
  const { table, isLoading, filters, setFilters } = useDataTable<BloodUnit, BloodUnitsFilters>({
    columns,
    fetchAction: getAllBloodUnitsAction,
    initialFilters: { search: "" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Blood Units</h1>
          <p className="text-slate-500 text-sm">Manage inventory of blood units.</p>
        </div>

        <Link
          href="/dashboard/blood-units/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all">
          <Plus className="w-4 h-4" />
          Add Blood Unit
        </Link>
      </div>

      <DataTable table={table} isLoading={isLoading}>
        <BloodUnitsTableFilter filters={filters} setFilters={setFilters} />
      </DataTable>
    </div>
  );
}
