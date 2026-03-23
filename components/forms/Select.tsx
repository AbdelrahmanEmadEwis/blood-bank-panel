import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  name?: string;
  defaultValue?: string;
}

function Select({
  label,
  error,
  className,
  options,
  name,
  placeholder,
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && <label className='text-sm font-medium text-slate-700'>{label}</label>}
      <ShadcnSelect name={name} defaultValue={defaultValue as string}>
        <SelectTrigger
          className={cn(
            'w-full rounded-xl border border-slate-200 bg-white px-4 py-6 h-auto text-sm text-slate-900',
            'focus:ring-0 focus:outline-none focus:border-blue-500 focus:ring-offset-0 transition-colors data-placeholder:text-slate-400',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
        >
          <SelectValue placeholder={placeholder || 'Select an option'} />
        </SelectTrigger>
        <SelectContent className='bg-white border-slate-200 text-slate-900 rounded-xl shadow-lg'>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className='focus:bg-slate-100 focus:text-slate-900 cursor-pointer py-2.5'
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}

export { Select };
