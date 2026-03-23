import { SidebarProvider, SidebarInset } from '@/components/ui';
import { AppSidebar, Header } from '@/components/layout';
import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = (await cookies()).get('sidebar_state')?.value !== 'false';
  return (
    <SidebarProvider defaultOpen={sidebarOpen}>
      <AppSidebar />
      <SidebarInset className='min-w-0 overflow-x-hidden'>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
