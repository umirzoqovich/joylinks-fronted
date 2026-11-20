import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ApplicationForm } from '@/components/site/application-form';
import { FaqSection } from '@/components/site/home/faq-section';
import { GraduatesSection } from '@/components/site/home/graduates-section';
import { PartnersMarquee } from '@/components/site/home/partners-marquee';
import { Reveal } from '@/components/site/reveal';
import { Avatar } from '@/components/ui/avatar';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { publicApi } from '@/lib/api/public';
import { getCourseAudience } from '@/lib/course-audience';
import { COURSE_FORMAT_LABELS, COURSE_LEVEL_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

const SKILLS_PER_GROUP = 3;

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = await publicApi.course((await params).slug);
  return { title: course.title, description: course.shortDescription };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, courses, settings, testimonials, partners, faqs] = await Promise.all([
    publicApi.course(slug),
    publicApi.courses(),
    publicApi.settings(),
    publicApi.testimonials(),
    publicApi.partners(),
    publicApi.faqs(),
  ]);

  const telHref = settings.phone ? `tel:${settings.phone.replace(/[^\d+]/g, '')}` : null;
  const info = `${course.durationMonths} oy · haftada ${course.lessonsPerWeek} kun · ${course.lessonHours} soat`;
  const skillGroups = [
    course.skills.slice(0, Math.ceil(course.skills.length / 2) || SKILLS_PER_GROUP),
    course.skills.slice(Math.ceil(course.skills.length / 2) || SKILLS_PER_GROUP),
  ].filter((group) => group.length > 0);

  const facts = [
    { label: 'Davomiyligi', value: `${course.durationMonths} oy` },
    { label: 'Haftasiga', value: `${course.lessonsPerWeek} marta` },
    { label: 'Dars davomiyligi', value: `${course.lessonHours} soat` },
    { label: 'Format', value: COURSE_FORMAT_LABELS[course.format] },
    { label: 'Daraja', value: COURSE_LEVEL_LABELS[course.level] },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section data-header-theme="dark" className="bg-ink-950 pt-32 pb-16 text-white lg:pb-24">
        <Container>
          <Reveal>
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <ArrowLeft className="size-4" aria-hidden /> Barcha kurslar
            </Link>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>{COURSE_LEVEL_LABELS[course.level]}</Chip>
              <Chip>{COURSE_FORMAT_LABELS[course.format]}</Chip>
              {course.isPopular && <Chip accent>Mashhur</Chip>}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance uppercase sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{course.shortDescription}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="#apply" variant="primary" size="lg">
                Ro&apos;yxatdan o&apos;tish <ArrowRight />
              </ButtonLink>
              <p className="text-base font-medium text-slate-200">{info}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Kimlar uchun */}
      <Section title="Bu kurs kimlar uchun?">
        <ul className="grid gap-5 md:grid-cols-3">
          {getCourseAudience(course.slug).map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <div className="h-full rounded-3xl border border-slate-200 p-7">
                  <h3 className="text-xl font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. O'quv dasturi */}
      {course.curriculum.length > 0 && (
        <Section title="Kursda nimalarni o'rganasiz?" tone="muted">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {course.curriculum.map((module, index) => (
              <li key={module.title}>
                <Reveal delay={(index % 3) * 0.05} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-brand-700 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {module.topics.length} ta mavzu
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-ink-950">{module.title}</h3>
                    <ul className="mt-4 space-y-2 text-slate-600">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex gap-2.5">
                          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 4. Ko'nikmalar */}
      {skillGroups.length > 0 && (
        <Section title="Ko'nikmalar" subtitle="Sohani o'rganib qanday ko'nikmalarga ega bo'lasiz?">
          <div className="grid gap-x-12 md:grid-cols-2">
            {skillGroups.map((group, i) => (
              <ul key={i} className="border-b border-slate-200">
                {group.map((skill) => (
                  <li key={skill} className="border-t border-slate-200 py-4 font-medium text-ink-950">
                    {skill}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </Section>
      )}

      {/* 5. Natijalar va ish joylari */}
      <GraduatesSection testimonials={testimonials} instagramUrl={settings.instagram} />
      <PartnersMarquee partners={partners} />

      {/* 6. Mentorlar */}
      {course.mentors.length > 0 && (
        <Section title="Mentorlar" tone="muted">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {course.mentors.map((mentor) => (
              <li key={mentor.id} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft">
                <Avatar name={mentor.fullName} src={mentor.photo} className="size-16 text-lg" />
                <div>
                  <p className="font-semibold text-ink-950">{mentor.fullName}</p>
                  <p className="text-sm text-slate-600">{mentor.position}</p>
                  <p className="text-sm text-slate-600">{mentor.experienceYears} yil tajriba</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 7. Narx */}
      <Section title="Kurs narxi">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] border border-slate-200 p-8 sm:p-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium text-slate-600">Oylik to&apos;lov</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-4xl font-extrabold whitespace-nowrap text-brand-700 tabular-nums sm:text-5xl">
                  {formatPrice(course.price)}
                </span>
                {course.oldPrice && (
                  <span className="text-lg whitespace-nowrap text-slate-500 line-through">
                    {formatPrice(course.oldPrice)}
                  </span>
                )}
              </div>
              <ButtonLink href="#apply" variant="primary" size="lg" className="mt-8">
                Ro&apos;yxatdan o&apos;tish <ArrowRight />
              </ButtonLink>
            </div>
            <dl className="border-b border-slate-200">
              {facts.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between border-t border-slate-200 py-3.5">
                  <dt className="text-slate-600">{label}</dt>
                  <dd className="font-semibold text-ink-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      {/* 8. FAQ */}
      <FaqSection faqs={faqs} />

      {/* 9. Yakuniy CTA + ariza */}
      <section data-header-theme="dark" id="apply" className="scroll-mt-24 bg-white py-8 sm:py-12 lg:py-20">
        <Container>
          <div className="grid gap-12 rounded-[2rem] bg-ink-950 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tighter text-balance text-white uppercase sm:text-4xl lg:text-5xl">
                Zamonaviy kasblargacha 1 qadam qoldi
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-slate-300">
                {course.title} kursi uchun hoziroq ro&apos;yxatdan o&apos;ting!
              </p>
              {telHref && (
                <a
                  href={telHref}
                  className="mt-8 inline-flex items-center gap-3 text-2xl font-semibold text-white tabular-nums transition-colors hover:text-brand-400"
                >
                  <Phone className="size-6" aria-hidden /> {settings.phone}
                </a>
              )}
            </Reveal>
            <Reveal delay={0.1} className="w-full max-w-xl lg:justify-self-end">
              <div className="rounded-2xl bg-white p-6 shadow-xl shadow-black/20 sm:p-8">
                <ApplicationForm courses={courses} defaultCourseId={course.id} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full px-3.5 py-1 text-sm font-medium ${accent ? 'bg-brand-500/20 text-brand-300' : 'border border-white/25 text-slate-200'}`}
    >
      {children}
    </span>
  );
}

interface SectionProps {
  title: string;
  subtitle?: string;
  tone?: 'default' | 'muted';
  children: ReactNode;
}

function Section({ title, subtitle, tone = 'default', children }: SectionProps) {
  return (
    <section className={`py-10 sm:py-16 lg:py-24 ${tone === 'muted' ? 'bg-slate-50' : 'bg-white'}`}>
      <Container>
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tighter uppercase text-ink-950 sm:text-4xl lg:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 text-lg text-slate-600">{subtitle}</p>}
        </Reveal>
        <div className="mt-10 lg:mt-12">{children}</div>
      </Container>
    </section>
  );
}
