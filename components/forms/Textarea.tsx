import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && <label className='text-sm font-medium text-slate-700'>{label}</label>}
      <textarea
        className={cn(
          'rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900',
          'placeholder:text-slate-400 resize-none min-h-[100px]',
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

export { Textarea };
