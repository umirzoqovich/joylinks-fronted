'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { ImageField, SwitchField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow, FormSection } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input, Select, Textarea } from '@/components/ui/input';
import { nullifyEmpty } from '@/lib/utils';
import { intField, optionalText, optionalUrl, orderField, requiredText } from '@/lib/validation';
import type { Testimonial } from '@/types';

const schema = z.object({
  fullName: requiredText(3, 'Ism-familiyani kiriting'),
  photo: z.string().nullable(),
  courseName: requiredText(2, 'Kurs nomini kiriting'),
  workplace: optionalText,
  position: optionalText,
  text: requiredText(10, 'Fikr kamida 10 ta belgidan iborat bo\'lsin'),
  rating: intField(1, 5),
  videoUrl: optionalUrl,
  order: orderField,
  isPublished: z.boolean(),
});

export function TestimonialForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Testimonial>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initialData?.fullName ?? '',
      photo: initialData?.photo ?? null,
      courseName: initialData?.courseName ?? '',
      workplace: initialData?.workplace ?? '',
      position: initialData?.position ?? '',
      text: initialData?.text ?? '',
      rating: initialData?.rating ?? 5,
      videoUrl: initialData?.videoUrl ?? '',
      order: initialData?.order ?? 0,
      isPublished: initialData?.isPublished ?? true,
    },
  });

  return (
    <FormLayout
      onSubmit={handleSubmit((values) => onSubmit(nullifyEmpty(values)))}
      onCancel={onCancel}
      submitting={isSubmitting}
    >
      <FormSection title="Bitiruvchi">
        <div className="flex flex-col gap-5 sm:flex-row">
          <ImageField control={control} name="photo" aspect="square" />
          <div className="flex-1 space-y-4">
            <FormField label="Ism-familiya" htmlFor="fullName" error={errors.fullName?.message} required>
              <Input id="fullName" {...register('fullName')} />
            </FormField>
            <FormField label="Tamomlagan kursi" htmlFor="courseName" error={errors.courseName?.message} required>
              <Input id="courseName" placeholder="Frontend dasturlash" {...register('courseName')} />
            </FormField>
          </div>
        </div>
        <FormRow>
          <FormField label="Ish joyi" htmlFor="workplace">
            <Input id="workplace" placeholder="Uzum" {...register('workplace')} />
          </FormField>
          <FormField label="Lavozimi" htmlFor="position">
            <Input id="position" placeholder="Frontend Developer" {...register('position')} />
          </FormField>
        </FormRow>
      </FormSection>

      <FormSection title="Fikr">
        <FormField label="Matn" htmlFor="text" error={errors.text?.message} required>
          <Textarea id="text" rows={5} {...register('text')} />
        </FormField>
        <FormRow>
          <FormField label="Baho" htmlFor="rating" error={errors.rating?.message}>
            <Select id="rating" {...register('rating')}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {'★'.repeat(value)} ({value})
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Tartib raqami" htmlFor="order" error={errors.order?.message}>
            <Input id="order" type="number" min={0} {...register('order')} />
          </FormField>
        </FormRow>
        <FormField label="Video havola" htmlFor="videoUrl" error={errors.videoUrl?.message}>
          <Input id="videoUrl" placeholder="https://youtube.com/..." {...register('videoUrl')} />
        </FormField>
        <SwitchField control={control} name="isPublished" label="Saytda ko'rsatish" />
      </FormSection>
    </FormLayout>
  );
}
