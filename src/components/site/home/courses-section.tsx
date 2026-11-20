import Link from 'next/link';

import { Container } from '@/components/ui/container';
import type { CourseSummary } from '@/types';

import { CourseCard } from '../course-card';
import { Reveal } from '../reveal';

export function CoursesSection({ courses }: { courses: CourseSummary[] }) {
  if (courses.length === 0) return null;

  return (
    <section id="courses" className="scroll-mt-24 bg-surface py-12 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold tracking-wide text-brand-600 uppercase">Kurslar</p>
            <h2 className="max-w-3xl text-3xl font-extrabold tracking-tighter text-balance text-ink-950 uppercase sm:text-4xl lg:text-5xl">
              O&apos;zingizga mos yo&apos;nalishni tanlang
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Dasturlash, kiberxavfsizlik, robototexnika va sun&apos;iy intellekt yo&apos;nalishlarida
              amaliyotga yo&apos;naltirilgan kurslar.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-base font-medium text-ink-950 underline-offset-4 hover:text-brand-700 hover:underline"
          >
            Barcha kurslar <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course, index) => (
            <Reveal key={course.id} delay={(index % 3) * 0.06} className="h-full">
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
