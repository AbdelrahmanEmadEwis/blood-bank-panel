'use client';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string;
}

export function SubmitButton({
  children,
  pendingLabel = 'Submitting…',
  className,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending || disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 cursor-pointer',
        'text-sm font-medium transition-colors',
        'bg-blue-600 text-white hover:bg-blue-700', // default styles
        className,
        'disabled:opacity-50 disabled:cursor-not-allowed', // always apply disabled
      )}
      {...props}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
