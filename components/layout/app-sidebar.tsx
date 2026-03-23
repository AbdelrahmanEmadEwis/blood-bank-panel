'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui';
import {
  LayoutDashboard,
  Users,
  LogOut,
  MessageSquare,
  Briefcase,
  Settings,
  FileText,
} from 'lucide-react';
import { navItems } from '@/constants/nav-items';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/features/auth';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  FileText,
};

export const company = {
  name: 'Shabaka Panel',
  logo: '/assets/images/clicks-logo.png',
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { logout } = useAuthStore();
  const router = useRouter();


  // logout fun
  const handleLogout = async () => {
    await logout();
    toast.success('Successfully logged out.');
    logoutAction(); // Call the server action to clear cookies and redirect
    router.refresh();
  };

  return (
    <Sidebar className='border-r-0 bg-[#0f172a] text-slate-300'>
      <SidebarContent className='overflow-x-hidden overflow-y-auto px-3 py-3 flex-1 scrollbar-thin'>
        <SidebarGroup>
          <p className='px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500'>
            Navigation
          </p>
          <SidebarMenu className='space-y-0.5'>
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => setOpenMobile(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 h-auto',
                      isActive
                        ? 'bg-blue-600/20 text-white border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.08)]'
                        : 'text-slate-400 hover:bg-white/6 hover:text-slate-200',
                    )}
                    render={
                      <Link href={item.url}>
                        <Icon
                          className={cn(
                            'h-[18px] w-[18px] shrink-0',
                            isActive ? 'text-blue-400' : 'text-slate-500',
                          )}
                        />
                        <span className='flex-1 truncate'>{item.title}</span>
                        {isActive && <div className='h-1.5 w-1.5 rounded-full bg-blue-400' />}
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-white/6 p-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group'
            >
              <LogOut className='h-[18px] w-[18px] shrink-0 text-slate-500 group-hover:text-red-400' />
              <span className='flex-1 truncate'>Logout</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
