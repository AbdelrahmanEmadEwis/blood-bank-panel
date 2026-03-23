/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BloodUnitsTableFilter({ filters, setFilters }: any) {
  return (
    <div className="flex items-center gap-4 py-4 px-6 bg-slate-50/50 border-b border-slate-100">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-colors group-focus-within:text-rose-500" />
        <Input
          placeholder="Search by barcode..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="pl-10 h-10 border-slate-200 focus-visible:ring-rose-200 focus-visible:border-rose-300 rounded-xl transition-all"
        />
      </div>
    </div>
  );
}
