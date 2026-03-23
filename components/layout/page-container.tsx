import React from 'react';
import { ScrollArea } from '@/components/ui';

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return scrollable ? (
    <ScrollArea className='h-[calc(100dvh-3.5rem)] w-full bg-slate-50/50'>
      <div className='p-4 md:p-6 min-h-full'>{children}</div>
    </ScrollArea>
  ) : (
    <div className='p-4 md:p-6 bg-slate-50/50 h-[calc(100dvh-3.5rem)] overflow-auto'>
      {children}
    </div>
  );
}
