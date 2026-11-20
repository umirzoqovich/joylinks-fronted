import { Compass, Flame, UserCheck, Wrench, type LucideIcon } from 'lucide-react';

import { Container } from '@/components/ui/container';

import { Reveal } from '../reveal';

const POINTS: { icon: LucideIcon; text: string }[] = [
  { icon: Compass, text: "Zamonaviy soha va ko'nikmalarni o'rganishga qiziqsangiz" },
  { icon: Flame, text: "Rivojlanish uchun kuchli muhit izlayotgan bo'lsangiz" },
  { icon: UserCheck, text: "Tajribali mentorlardan bilim olib, professional kadr bo'lmoqchi bo'lsangiz" },
  { icon: Wrench, text: "Yangi bilimlarni amaliyot bilan mustahkamlamoqchi bo'lsangiz" },
];

export function IntroSection() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tighter uppercase text-ink-950 sm:text-4xl lg:text-5xl">
            Joylinks siz uchun, agar&hellip;
          </h2>
        </Reveal>
        <ul className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, text }, index) => (
            <li key={text}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="h-full rounded-3xl border border-slate-200 p-2.5">
                  <div className="flex h-full min-h-56 flex-col justify-between gap-10 rounded-2xl bg-ink-950 p-6">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <p className="text-base leading-snug font-semibold text-white">{text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
