'use client';

import { Dispatch, SetStateAction } from 'react';

interface PatientsTableFilterProps {
  filters: { search?: string };
  setFilters: Dispatch<SetStateAction<{ search?: string }>>;
}

export function PatientsTableFilter({ filters, setFilters }: PatientsTableFilterProps) {
  return (
    <div className='flex items-center py-4'>
      <input
        type='text'
        placeholder='Search by MRN or name...'
        value={filters.search || ''}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        className='w-full sm:max-w-sm px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
      />
    </div>
  );
}
