import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const TONES = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  blue: 'bg-sky-50 text-sky-700 ring-sky-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  dark: 'bg-ink-900 text-white ring-ink-800',
} as const;

export type BadgeTone = keyof typeof TONES;

interface BadgeProps extends ComponentProps<'span'> {
  tone?: BadgeTone;
  dot?: boolean;
}

export function Badge({ tone = 'slate', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        TONES[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
