'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  label?: string;
  error?: string;
}

function PasswordInput({ className, label, error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='flex flex-col gap-1.5 w-full'>
      {label && <label className='text-sm font-medium text-content-secondary'>{label}</label>}
      <div className='relative w-full'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-12', error && 'border-red-500', className)}
          {...props}
        />
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer'
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
        </button>
      </div>
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  );
}

export { PasswordInput };
