import { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
        className,
      )}
      {...props}
    >
      <div className='flex-1 text-sm text-slate-500 whitespace-nowrap'>
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of {table.getRowCount()} row(s)
            selected.
          </>
        ) : (
          <>{table.getRowCount()} row(s) total.</>
        )}
      </div>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium text-slate-700 whitespace-nowrap'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-18 rounded-lg border-slate-200 bg-white text-slate-900 '>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              side='top'
              className='rounded-xl border-slate-200 bg-white text-slate-900 shadow-lg'
            >
              {pageSizeOptions.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className='focus:bg-slate-100 cursor-pointer'
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium text-slate-700 '>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <button
            type='button'
            aria-label='Go to first page'
            className='hidden size-8 lg:flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='size-4' />
          </button>
          <button
            type='button'
            aria-label='Go to previous page'
            className='flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='size-4' />
          </button>
          <button
            type='button'
            aria-label='Go to next page'
            className='flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='size-4' />
          </button>
          <button
            type='button'
            aria-label='Go to last page'
            className='hidden size-8 lg:flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='size-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
