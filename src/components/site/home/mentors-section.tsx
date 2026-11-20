import { ArrowUpRight, User } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import type { Mentor } from '@/types';

import { MentorCard } from '../mentor-card';
import { Reveal } from '../reveal';

/** Katta kartalar soni; qolganlari "+N" kartasida jamlanadi */
const FEATURED_COUNT = 3;

export function MentorsSection({ mentors }: { mentors: Mentor[] }) {
  const featured = mentors.slice(0, FEATURED_COUNT);
  const rest = mentors.length - featured.length;

  return (
    <section id="mentors" data-header-theme="dark" className="scroll-mt-24 bg-ink-950 py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tighter text-balance text-white sm:text-4xl lg:text-5xl">
            Tajribali mentorlar
          </h2>
          <p className="max-w-xs text-slate-400 md:text-right">
            Joylinks mentorlari — amaliyotchi IT mutaxassislari, bilimini real loyihalarda sinagan.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.length > 0
            ? featured.map((mentor, index) => (
                <Reveal key={mentor.id} delay={index * 0.06}>
                  <MentorCard mentor={mentor} />
                </Reveal>
              ))
            : Array.from({ length: FEATURED_COUNT }, (_, index) => (
                <div
                  key={index}
                  className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-ink-800 text-slate-500"
                >
                  <User className="size-14" aria-hidden />
                  <p className="text-sm font-semibold">Ustoz tez orada qo&apos;shiladi</p>
                </div>
              ))}

          <Reveal delay={FEATURED_COUNT * 0.06} className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/mentors"
              className="group flex min-h-48 flex-col justify-between rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-950 to-ink-950 p-6 transition hover:border-brand-400 lg:aspect-[3/4]"
            >
              <p className="text-6xl font-extrabold text-brand-400 sm:text-7xl">
                {rest > 0 ? `+${rest}` : mentors.length || '10+'}
              </p>
              <div>
                <p className="text-xl font-bold text-white">
                  {rest > 0 ? 'boshqa mentorlar Joylinks jamoasida' : 'mentorlar Joylinks jamoasida'}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-brand-400">
                  Barcha mentorlar
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
