"use client";

import { DataTable } from "@/components/shared";
import { getAllCrossMatchesAction } from "../actions/cross-matches";
import { columns } from "./columns";
import type { CrossMatch } from "../types";
import { useDataTable } from "@/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CrossMatchesTableFilter } from "./cross-match-table-filter";

type CrossMatchesFilters = {
  search?: string;
};

export function CrossMatchesTable() {
  const { table, isLoading, filters, setFilters } = useDataTable<CrossMatch, CrossMatchesFilters>({
    columns,
    fetchAction: getAllCrossMatchesAction,
    initialFilters: { search: "" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cross Matches</h1>
          <p className="text-slate-500">Manage all cross match procedures and results.</p>
        </div>

        <Link
          href="/dashboard/matches/create"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          Perform Cross Match
        </Link>
      </div>

      <DataTable table={table} isLoading={isLoading}>
        <CrossMatchesTableFilter filters={filters} setFilters={setFilters} />
      </DataTable>
    </div>
  );
}

