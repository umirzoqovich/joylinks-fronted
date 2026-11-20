import { Container } from '@/components/ui/container';
import { ABOUT_TIMELINE, SITE_FOUNDED_YEAR, SITE_STATS } from '@/lib/constants';
import type { SiteSettings } from '@/types';

import { Reveal } from '../reveal';
import { AboutTimeline } from './about-timeline';
import { CountUp } from './count-up';

interface ProcessSectionProps {
  settings?: SiteSettings;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  /** Yil kabi sonlar "2 025" bo'lib ketmasligi uchun */
  plain?: boolean;
}

export function ProcessSection({ settings }: ProcessSectionProps) {
  const stats: Stat[] = [
    ...SITE_STATS,
    { value: SITE_FOUNDED_YEAR, suffix: '', label: 'Faoliyat boshlangan yil', plain: true },
  ];

  return (
    <section id="about" data-header-theme="dark" className="scroll-mt-24 bg-ink-950 py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <p className="mb-3 text-sm font-bold tracking-wide text-brand-400 uppercase">Biz haqimizda</p>
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tighter text-balance text-white uppercase sm:text-4xl lg:text-5xl">
            {SITE_FOUNDED_YEAR}-yilda ochilgan IT akademiya: yoshlarga zamonaviy kasb beramiz
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Joylinks IT Academy — Surxondaryo viloyati, Termiz shahridagi o&apos;quv markazi. Amaliyotga
            yo&apos;naltirilgan kurslar orqali o&apos;quvchilarimiz zamonaviy IT kasblarini egallaydi.
          </p>
        </Reveal>

        <AboutTimeline items={ABOUT_TIMELINE} tone="dark" />

        {stats.length > 0 && (
          <dl className="mt-8 sm:mt-14 grid grid-cols-2 gap-4 lg:grid-cols-5 [&>div:last-child]:col-span-2 lg:[&>div:last-child]:col-span-1">
            {stats.map((stat) => (
              <div key={stat.label} className="flex min-h-36 flex-col-reverse justify-between rounded-2xl border border-white/10 bg-ink-800 p-5">
                <dt className="mt-3 text-sm leading-snug text-slate-400">{stat.label}</dt>
                <dd className="text-3xl leading-none font-extrabold tracking-tight whitespace-nowrap text-brand-400 tabular-nums sm:text-4xl">
                  {stat.plain ? stat.value : <CountUp value={stat.value} suffix={stat.suffix} />}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
