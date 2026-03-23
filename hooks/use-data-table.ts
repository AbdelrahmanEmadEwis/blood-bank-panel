'use client';

import { useState, useEffect } from 'react';
import { getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import type { PaginatedResponse } from '@/types';
// 1. Notice the `TFilters` generic! This means we can pass ANY shape for filters we want
interface UseDataTableProps<TData, TFilters> {
  columns: ColumnDef<TData>[];
  fetchAction: (
    page: number,
    page_size: number,
    filters: TFilters,
  ) => Promise<PaginatedResponse<TData>>;
  initialFilters: TFilters;
}

// 2. We use React Generics so TypeScript knows what type of data your table holds
export function useDataTable<TData, TFilters>({
  columns,
  fetchAction,
  initialFilters,
}: UseDataTableProps<TData, TFilters>) {
  // Pagination State
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Our powerful, dynamic Filter State
  const [filters, setFilters] = useState<TFilters>(initialFilters);

  const [data, setData] = useState<TData[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Effect! It triggers any time pagination or filters change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // We pass our filters object straight into your server action
        const response = await fetchAction(pagination.pageIndex + 1, pagination.pageSize, filters);
        setData(response.results);
        setTotalRows(response.count);
      } catch (error) {
        console.error('Failed to fetch abstract table data', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadData, 300); // 300ms Debounce
    return () => clearTimeout(timer);
  }, [pagination, filters, fetchAction]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalRows,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  // Return everything a parent page component needs!
  return {
    table,
    isLoading,
    filters, // Export the current filter state
    setFilters, // Export the setter so the UI can update filters!
  };
}
