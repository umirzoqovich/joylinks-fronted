import {
  Award,
  Briefcase,
  Building2,
  Gift,
  Percent,
  Rocket,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/types';

import { Reveal } from '../reveal';

interface Advantage {
  title: string;
  description: string;
  icon: LucideIcon;
  /** lg ekranda necha ustunni egallaydi (6 ustunli setka) */
  span: string;
  tone: 'green' | 'blue';
}

const ADVANTAGES: Advantage[] = [
  { title: 'Mukofotlar va nominatsiyalar', description: "Eng yaxshi o'quvchilar uchun sovrinlar va e'tirof.", icon: Award, span: 'lg:col-span-3', tone: 'green' },
  { title: 'Karyera markazi', description: "Ish bilan ta'minlash, CV va suhbatga tayyorgarlik.", icon: Briefcase, span: 'lg:col-span-3', tone: 'blue' },
  { title: 'Kuchli mentorlar', description: 'Sohada ishlayotgan amaliyotchi ustozlar dars beradi.', icon: Users, span: 'lg:col-span-2', tone: 'green' },
  { title: '24/7 kovorking', description: "Istalgan vaqtda o'qish va ishlash uchun qulay maydon.", icon: Building2, span: 'lg:col-span-2', tone: 'blue' },
  { title: 'Chegirmalar', description: "A'lochilar va do'st taklif qilganlar uchun imtiyozlar.", icon: Percent, span: 'lg:col-span-2', tone: 'blue' },
  { title: 'Startap inkubatsiyasi', description: "G'oyangizni loyihaga aylantirishda yordam beramiz.", icon: Rocket, span: 'lg:col-span-4', tone: 'green' },
  { title: 'Onlayn platforma', description: 'Darsliklar, vazifalar va yozuvlar bir joyda.', icon: Gift, span: 'lg:col-span-2', tone: 'blue' },
  { title: 'Mobil ilova', description: "Bilimingizni telefonda ham mustahkamlang.", icon: Smartphone, span: 'lg:col-span-2', tone: 'blue' },
  { title: "Qulay to'lov", description: "Oylik to'lov va bo'lib to'lash imkoniyati.", icon: Gift, span: 'lg:col-span-4', tone: 'green' },
];

const TONES = {
  green: 'bg-gradient-to-br from-brand-400 to-brand-600 text-white/40',
  blue: 'bg-gradient-to-br from-brand-500 to-brand-800 text-white/30',
} as const;

export function AdvantagesSection({ settings }: { settings?: SiteSettings }) {
  return (
    <section data-header-theme="dark" className="bg-ink-950 py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tighter text-white uppercase sm:text-4xl lg:text-5xl">
            Nega aynan Joylinks
          </h2>
          {settings && settings.employmentRate > 0 && (
            <p className="mt-4 text-lg text-slate-300">
              Bitiruvchilarimizning {settings.employmentRate}% i ishga joylashgan.
            </p>
          )}
        </Reveal>

        <ul className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {ADVANTAGES.map(({ title, description, icon: Icon, span, tone }, index) => (
            <li key={title} className={cn(span)}>
              <Reveal delay={(index % 3) * 0.05} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-ink-800 p-5">
                  <div
                    aria-hidden
                    className={cn('flex h-28 items-center justify-center rounded-2xl', TONES[tone])}
                  >
                    <Icon className="size-14" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
