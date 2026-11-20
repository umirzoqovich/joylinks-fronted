'use client';

import { Star } from 'lucide-react';

import { MutedCell, PersonCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { TestimonialForm } from '@/components/admin/forms/testimonial-form';
import type { Testimonial } from '@/types';

export default function TestimonialsAdminPage() {
  return (
    <CrudPage<Testimonial>
      resource="testimonials"
      title="Bitiruvchilar fikri"
      description="Saytdagi muvaffaqiyat hikoyalari"
      entityName="fikr"
      searchText={(item) => `${item.fullName} ${item.courseName} ${item.workplace ?? ''}`}
      renderForm={(props) => <TestimonialForm {...props} />}
      columns={[
        {
          key: 'name',
          header: 'Bitiruvchi',
          cell: (item) => <PersonCell name={item.fullName} subtitle={item.courseName} photo={item.photo} />,
        },
        {
          key: 'workplace',
          header: 'Ish joyi',
          cell: (item) => <MutedCell>{item.workplace ?? '—'}</MutedCell>,
        },
        {
          key: 'rating',
          header: 'Baho',
          cell: (item) => (
            <span className="inline-flex items-center gap-1 font-bold text-slate-700">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          ),
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (item) => <VisibilityBadge visible={item.isPublished} />,
        },
      ]}
    />
  );
}
