import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Reveal } from './reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  inverted?: boolean;
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted,
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal
      className={cn(
        'mb-14 flex flex-col gap-6 md:mb-20',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p
            className={cn(
              'mb-3 text-sm font-bold tracking-wide uppercase',
              inverted ? 'text-brand-400' : 'text-brand-600',
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            'text-3xl font-extrabold tracking-tighter text-balance uppercase sm:text-4xl lg:text-5xl',
            inverted ? 'text-white' : 'text-ink-950',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-5 text-lg leading-relaxed text-pretty',
              inverted ? 'text-slate-300' : 'text-slate-600',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
