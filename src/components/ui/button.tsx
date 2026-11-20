import Link from 'next/link';
import { forwardRef, type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Spinner } from './spinner';

const VARIANTS = {
  /** Yashil tekis tugma — asosiy */
  primary:
    'border border-transparent bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] disabled:bg-brand-300',
  accent:
    'border border-transparent bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]',
  /** To'q fonlarda yorqin yashil tugma */
  bright:
    'border border-transparent bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]',
  secondary: 'border border-transparent bg-ink-950 text-white hover:bg-ink-800 active:scale-[0.98]',
  outline:
    'border border-slate-300 bg-white text-ink-950 hover:border-brand-500 hover:text-brand-700 active:scale-[0.98]',
  ghost:
    'border border-transparent text-slate-700 hover:bg-slate-100 hover:text-ink-950',
  /** To'q fonlarda kontur tugma */
  glass:
    'border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 active:scale-[0.98]',
  danger: 'border border-transparent bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
} as const;

const SIZES = {
  sm: 'h-9 gap-1.5 rounded-full px-4 text-sm',
  md: 'h-11 gap-2 rounded-full px-6 text-sm',
  lg: 'h-12 gap-2.5 rounded-full px-7 text-base',
  icon: 'size-10 rounded-full',
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonStyles({ variant = 'primary', size = 'md' }: StyleProps = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap transition-all duration-200',
    'disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0',
    VARIANTS[variant],
    SIZES[size],
  );
}

interface ButtonProps extends ComponentProps<'button'>, StyleProps {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading, disabled, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

interface ButtonLinkProps extends ComponentProps<typeof Link>, StyleProps {}

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
