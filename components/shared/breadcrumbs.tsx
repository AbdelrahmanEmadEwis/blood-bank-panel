'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';
import { navItems } from '@/constants/nav-items';

export function Breadcrumbs() {
  const pathname = usePathname();

  // Basic implementation to construct breadcrumbs from pathname
  // e.g. /users/123 -> Dashboard / Users / 123
  const generateBreadcrumbs = () => {
    // If we're on the dashboard overview
    if (pathname === '/') {
      return [{ title: 'Overview', link: '/' }];
    }

    const segments = pathname.split('/').filter(Boolean);
    const items = [];

    let currentLink = '';
    for (let i = 0; i < segments.length; i++) {
      currentLink += `/${segments[i]}`;
      // Try to find a matching name in navItems
      const matchingNav = navItems.find((nav) => nav.url === currentLink);

      let title = matchingNav?.title;
      // Fallback to capitalizing the segment if not in nav
      if (!title) {
        title = segments[i].charAt(0).toUpperCase() + segments[i].slice(1).replace(/-/g, ' ');
      }

      items.push({
        title,
        link: currentLink,
      });
    }

    return items;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.link}>
            {index !== breadcrumbs.length - 1 ? (
              <>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
