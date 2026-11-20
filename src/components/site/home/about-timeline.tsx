import { cn } from '@/lib/utils';
import type { TimelineItem } from '@/lib/constants';

interface AboutTimelineProps {
  items: readonly TimelineItem[];
  tone?: 'light' | 'dark';
}

/** Yillar bo'yicha tarix: katta ekranda gorizontal, mobilda vertikal */
export function AboutTimeline({ items, tone = 'light' }: AboutTimelineProps) {
  if (items.length === 0) return null;
  const dark = tone === 'dark';

  return (
    <ol
      className={cn(
        'mt-8 sm:mt-14 grid gap-8 border-l pl-6 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] lg:gap-6 lg:border-t lg:border-l-0 lg:pt-8 lg:pl-0',
        dark ? 'border-white/15' : 'border-slate-200',
      )}
    >
      {items.map((item) => (
        <li key={item.year} className="relative">
          <span
            aria-hidden
            className={cn(
              'absolute top-1.5 -left-[1.9rem] size-3 rounded-full bg-brand-400 ring-4 lg:-top-[2.45rem] lg:left-0',
              dark ? 'ring-ink-950' : 'ring-white',
            )}
          />
          <p className={cn('text-2xl font-bold tracking-tight', dark ? 'text-white' : 'text-ink-950')}>
            {item.year}
          </p>
          <p className={cn('mt-2 max-w-sm', dark ? 'text-slate-300' : 'text-slate-600')}>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
