'use client';
import { SidebarTrigger, Separator } from '@/components/ui';
import { Breadcrumbs } from '@/components/shared';

export default function Header() {
  return (
    <header className='flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1 text-slate-500 hover:text-slate-900' />
        <Separator orientation='vertical' className='mr-2 h-4 bg-slate-200' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        {/* Placeholder for Search or other top-right features */}
      </div>
    </header>
  );
}
