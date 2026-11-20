'use client';

import { Flame } from 'lucide-react';

import { MutedCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { CourseForm } from '@/components/admin/forms/course-form';
import { CourseIcon } from '@/components/ui/course-icon';
import { formatPrice } from '@/lib/utils';
import type { AdminCourse, AdminCourseDetails } from '@/types';

export default function CoursesAdminPage() {
  return (
    <CrudPage<AdminCourse, AdminCourseDetails>
      resource="courses"
      title="Kurslar"
      description="Saytdagi yo'nalishlar, narxlar va o'quv dasturlari"
      entityName="kurs"
      fetchDetails
      drawerSize="lg"
      searchText={(course) => course.title}
      renderForm={(props) => <CourseForm {...props} />}
      columns={[
        {
          key: 'title',
          header: 'Kurs',
          cell: (course) => (
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: course.color }}
              >
                <CourseIcon name={course.icon} className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-bold text-slate-900">
                  {course.title}
                  {course.isPopular && <Flame className="size-4 text-orange-500" />}
                </p>
                <p className="text-xs text-slate-500">/{course.slug}</p>
              </div>
            </div>
          ),
        },
        {
          key: 'price',
          header: 'Narx',
          cell: (course) => <MutedCell>{formatPrice(course.price)}</MutedCell>,
        },
        {
          key: 'duration',
          header: 'Davomiyligi',
          cell: (course) => <MutedCell>{course.durationMonths} oy</MutedCell>,
        },
        {
          key: 'applications',
          header: 'Arizalar',
          cell: (course) => <MutedCell>{course._count.applications}</MutedCell>,
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (course) => <VisibilityBadge visible={course.isPublished} />,
        },
      ]}
    />
  );
}
