'use client';

import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, description, disabled }: SwitchProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-slate-200 p-3.5 transition hover:border-slate-300',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      {(label || description) && (
        <span className="space-y-0.5">
          {label && <span className="block text-sm font-semibold text-slate-800">{label}</span>}
          {description && <span className="block text-[13px] text-slate-500">{description}</span>}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          checked ? 'bg-brand-600' : 'bg-slate-300',
        )}
      >
        <span
          className={cn(
            'inline-block size-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </label>
  );
}
