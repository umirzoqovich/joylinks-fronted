import { forwardRef, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export const fieldStyles = cn(
  'w-full rounded-lg border border-slate-300 bg-white px-4 text-[15px] text-slate-900 transition',
  'placeholder:text-slate-500 hover:border-slate-400',
  'focus:border-brand-700 focus:ring-2 focus:ring-brand-700 focus:outline-none',
  'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70',
  'aria-invalid:border-red-400 aria-invalid:focus:ring-red-500/15',
);

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cn(fieldStyles, 'h-11', className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(
  function Textarea({ className, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(fieldStyles, 'resize-y py-3 leading-relaxed', className)}
        {...props}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, ComponentProps<'select'>>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        fieldStyles,
        'h-11 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
