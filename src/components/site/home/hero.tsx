import { ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { SITE_STATS } from '@/lib/constants';
import { Container } from '@/components/ui/container';
import type { CourseSummary, Mentor, SiteSettings, Testimonial } from '@/types';

import { Reveal } from '../reveal';
import { CountUp } from './count-up';
import { HeroWall } from './hero-wall';

interface HeroProps {
  settings: SiteSettings;
  courses: CourseSummary[];
  mentors?: Mentor[];
  testimonials?: Testimonial[];
}

const PERKS = [
  "Zamonaviy o'quv dasturi",
  'Amaliyotchi ustozlar',
  'Bepul master-klasslar',
  'Sertifikat',
];

export function Hero({ settings, courses, mentors, testimonials }: HeroProps) {
  const graduates = new Intl.NumberFormat('ru-RU').format(settings.graduatesCount);
  const hasGraduates = settings.graduatesCount > 0;
  const stats = SITE_STATS;

  return (
    <section data-header-theme="dark" className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink-950 pt-28 text-white lg:pt-32">
      <HeroWall courses={courses} mentors={mentors} testimonials={testimonials} />

      <Container className="relative flex flex-1 flex-col justify-center py-12 text-center">
        <Reveal>
          <h1 className="mx-auto max-w-5xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance uppercase sm:text-6xl lg:text-7xl">
            {hasGraduates ? (
              <>
                <span className="text-brand-400">{graduates}+</span> o&apos;quvchi
              </>
            ) : (
              settings.heroTitle
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-200 sm:text-2xl">
            {hasGraduates ? (
              <>
                Keyingisi <b className="font-semibold text-brand-400">siz</b> bo&apos;lishingiz mumkin!
              </>
            ) : (
              settings.heroSubtitle
            )}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/#apply"
            variant="primary"
            size="lg"
          >
            Bepul konsultatsiya olish
            <ArrowRight />
          </ButtonLink>
          <ButtonLink
            href="/courses"
            variant="glass"
            size="lg"
          >
            Kurslarni ko&apos;rish
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.2} >
          <dl className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 border-t border-white/15 pt-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-4xl leading-none font-extrabold tracking-tight whitespace-nowrap text-brand-400 tabular-nums lg:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-slate-300">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      <div className="relative border-t border-white/15 bg-ink-950/70 backdrop-blur-sm">
        <Container>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <li
                key={perk}
                className={`px-4 py-5 text-center text-sm text-slate-200 ${i > 0 ? 'lg:border-l lg:border-white/15' : ''} ${i % 2 === 1 ? 'border-l border-white/15' : ''}`}
              >
                {perk}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
