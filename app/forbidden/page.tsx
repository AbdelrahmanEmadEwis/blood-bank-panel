// d:\Clicks-Digitals\shabak\shabaka-panel\app\forbidden\page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10'>
        <ShieldAlert className='h-10 w-10 text-destructive' />
      </div>
      <h1 className='mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
        Access Denied
      </h1>
      <p className='mt-4 text-muted-foreground w-full max-w-md'>
        You do not have permission to access this page. Please contact your administrator if you
        believe this is a mistake.
      </p>
      <div className='mt-8 flex gap-4'>
        <Button variant='outline'>
          <Link href='/dashboard'>Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
