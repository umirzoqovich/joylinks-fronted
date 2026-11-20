import { Container } from '@/components/ui/container';
import type { CourseSummary } from '@/types';

import { ApplicationForm } from '../application-form';
import { Reveal } from '../reveal';

interface ApplicationSectionProps {
  courses: CourseSummary[];
  phone?: string;
}

export function ApplicationSection({ courses, phone }: ApplicationSectionProps) {
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null;

  return (
    <section data-header-theme="dark" id="apply" className="scroll-mt-24 bg-white py-8 sm:py-12 lg:py-20">
      <Container>
        <div className="grid gap-12 rounded-[2rem] bg-ink-950 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tighter text-balance text-white uppercase sm:text-4xl lg:text-5xl">
              Bepul konsultatsiyaga hoziroq yoziling
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-300">
              Qisqa ariza qoldiring — mutaxassisimiz sizga mos yo&apos;nalishni tanlashda yordam beradi
              va o&apos;zi qo&apos;ng&apos;iroq qiladi.
            </p>
            {phone && telHref && (
              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-300">Yoki qo&apos;ng&apos;iroq qiling:</p>
                <a
                  href={telHref}
                  className="mt-2 inline-block rounded-sm text-2xl font-semibold tracking-tight text-white tabular-nums transition-colors hover:text-brand-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                >
                  {phone}
                </a>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="w-full max-w-xl lg:justify-self-end">
            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
              <ApplicationForm courses={courses} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
