'use client';
import * as React from 'react';
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table';
import { DataTablePagination, DataTableSkeleton } from '@/components/shared';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  columnCount?: number;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  isLoading,
  columnCount,
  ...props
}: DataTableProps<TData>) {
  const columns = columnCount || table.getAllColumns().length;

  return (
    <div className='flex flex-1 flex-col space-y-4' {...props}>
      {children}

      {isLoading ? (
        <DataTableSkeleton columnCount={columns} rowCount={table.getState().pagination.pageSize} />
      ) : (
        <div className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
          <div className='overflow-x-auto w-full'>
            <Table>
              <TableHeader className='bg-slate-50'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className='border-slate-200 hover:bg-transparent'>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className='text-slate-600 h-11 font-medium whitespace-nowrap'
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='border-slate-200 hover:bg-slate-50 transition-colors'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='py-3 text-slate-700 whitespace-nowrap'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns().length}
                      className='h-24 text-center text-slate-500'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-4'>
        <DataTablePagination table={table} />
        {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className='pt-2'>{actionBar}</div>
        )}
      </div>
    </div>
  );
}
