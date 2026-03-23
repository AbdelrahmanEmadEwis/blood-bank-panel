import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && <label className='text-sm font-medium text-slate-700'>{label}</label>}
      <input
        className={cn(
          'rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900',
          'placeholder:text-slate-400',
          'focus:outline-none focus:border-blue-500 transition-colors',
          error && 'border-red-500 focus:border-red-500',
          className,
        )}
        {...props}
      />
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}

export { Input };
