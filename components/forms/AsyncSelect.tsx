'use client';

import * as React from 'react';
import { Check, Loader2, X, ChevronsUpDown } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export interface Option {
  value: string;
  label: string;
}

interface AsyncSelectProps {
  fetcher: (query: string) => Promise<Option[]>;
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  defaultOptions?: Option[];
  name?: string;
}

export function AsyncSelect({
  fetcher,
  label,
  placeholder = 'Select option...',
  error,
  value: controlledValue,
  onChange,
  defaultValue,
  className,
  defaultOptions = [],
  name,
}: AsyncSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>(defaultOptions);
  const [loading, setLoading] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const [selectedOption, setSelectedOption] = React.useState<Option | undefined>(
    defaultOptions.find((opt) => opt.value === value),
  );

  const [search, setSearch] = React.useState(selectedOption?.label || '');
  const debouncedSearch = useDebounce(search, 500);

  // Sync state with selected value
  React.useEffect(() => {
    if (value) {
      const found =
        options.find((o) => o.value === value) || defaultOptions.find((o) => o.value === value);
      if (found) {
        setSelectedOption(found);
        // Only update search if not currently editing (to avoid jumping cursor etc)
        // But here we might want to ensure label is correct if programmatically changed.
        // A simple check: if !open, likely external update.
        if (!open) setSearch(found.label);
      }
    } else {
      setSelectedOption(undefined);
      if (!open) setSearch('');
    }
  }, [value, options, defaultOptions, open]);

  React.useEffect(() => {
    let active = true;

    const loadOptions = async () => {
      setLoading(true);
      try {
        const res = await fetcher(debouncedSearch);
        if (active) {
          setOptions(res);
        }
      } catch (err) {
        console.error('AsyncSelect fetch error:', err);
        if (active) setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    // Prevent fetch if search matches selected option label exactly (avoids refetch on select)
    if (debouncedSearch && selectedOption && debouncedSearch === selectedOption.label) {
      return;
    }

    loadOptions();

    return () => {
      active = false;
    };
  }, [debouncedSearch, fetcher, selectedOption]);

  const handleSelect = (option: Option) => {
    if (onChange) {
      onChange(option.value);
    }
    setInternalValue(option.value);
    setSelectedOption(option);
    setSearch(option.label);
    setOpen(false);
  };

  return (
    <div className='flex flex-col gap-1.5 relative'>
      {label && <label className='text-sm font-medium text-slate-700'>{label}</label>}

      <div className='relative'>
        <input
          type='text'
          className={cn(
            'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 pr-10',
            'placeholder:text-slate-400',
            'focus:outline-none focus:border-blue-500 transition-colors',
            error && 'border-red-500 focus:border-red-500',
            className,
          )}
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
            if (!e.target.value) {
              handleSelect({ value: '', label: '' });
            }
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay hiding to allow click on option
            setTimeout(() => setOpen(false), 200);
          }}
        />
        {selectedOption && value ? (
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSelect({ value: '', label: '' });
              setSearch('');
            }}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1'
          >
            <X className='h-4 w-4' />
          </button>
        ) : (
          <ChevronsUpDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none' />
        )}
      </div>

      {open && (
        <div className='absolute top-full mt-1 z-[9999] w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden max-h-60 overflow-y-auto'>
          <Command shouldFilter={false}>
            <CommandList>
              {loading && (
                <div className='py-6 text-center text-sm flex items-center justify-center gap-2 text-slate-500'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Loading...
                </div>
              )}
              {!loading && options.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
              {!loading && (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option)}
                      className='cursor-pointer py-2 px-4 hover:bg-slate-100 aria-selected:bg-slate-100 data-[selected=true]:bg-slate-100'
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
      {name && <input type='hidden' name={name} value={value} />}
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
