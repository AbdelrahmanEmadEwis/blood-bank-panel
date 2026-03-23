'use client';

import { cn } from '@/lib/utils';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableSkeleton({ columnCount, rowCount = 10 }: DataTableSkeletonProps) {
  return (
    <div className='group relative rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300'>
      {/* Shimmer overlay effect */}
      <div className='absolute inset-0 z-0 pointer-events-none bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer' />

      <div className='overflow-x-auto w-full relative z-1'>
        <Table>
          <TableHeader className='bg-slate-50/80'>
            <TableRow className='border-slate-200 hover:bg-transparent'>
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i} className='h-12'>
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-20 rounded-md bg-slate-200 animate-pulse blur-[1px] opacity-60' />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow
                key={i}
                className='border-slate-200 group-hover:bg-slate-50/50 transition-colors'
              >
                {Array.from({ length: columnCount }).map((_, j) => {
                  // Generate varying widths for a more natural look
                  const widthClasses = ['w-[40%]', 'w-[60%]', 'w-[80%]', 'w-[50%]', 'w-[70%]'];
                  const width = widthClasses[(i + j) % widthClasses.length];

                  return (
                    <TableCell key={j} className='py-4'>
                      <div className='space-y-2'>
                        <div
                          className={cn(
                            'h-3.5 rounded-full bg-slate-200/80 animate-pulse blur-[1.5px]',
                            width,
                          )}
                        />
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
