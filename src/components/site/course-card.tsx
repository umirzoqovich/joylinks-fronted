import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CourseIcon } from '@/components/ui/course-icon';
import { COURSE_FORMAT_LABELS, COURSE_LEVEL_LABELS } from '@/lib/constants';
import { formatPrice, mediaUrl } from '@/lib/utils';
import type { CourseSummary } from '@/types';

export function CourseCard({ course }: { course: CourseSummary }) {
  const image = mediaUrl(course.image);
  const meta = `${course.durationMonths} oy · ${COURSE_FORMAT_LABELS[course.format]}`;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
    >
      <div className="relative flex h-32 items-center justify-center bg-brand-100">
        {image ? (
          <Image src={image} alt={course.title} fill unoptimized className="object-cover" />
        ) : (
          <span
            aria-hidden
            className="flex size-[5.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white"
          >
            <CourseIcon name={course.icon} className="size-10" />
          </span>
        )}
        {course.isPopular && (
          <span className="absolute top-3 right-3 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
            ↑ Top
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-wide text-brand-600 uppercase">
          {COURSE_LEVEL_LABELS[course.level]}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-ink-950">{course.title}</h3>
        <p className="mt-3 mb-5 flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="size-4 text-slate-400" aria-hidden />
          {meta}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Oylik to&apos;lov</p>
            <p className="text-base font-bold text-ink-950">
              {formatPrice(course.price)}
              {course.oldPrice && (
                <span className="ml-2 text-sm font-normal text-slate-400 line-through">
                  {formatPrice(course.oldPrice)}
                </span>
              )}
            </p>
          </div>
          <span
            aria-hidden
            className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
