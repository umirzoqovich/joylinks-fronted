'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { ImageField, SwitchField, TagsField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow, FormSection } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { nullifyEmpty } from '@/lib/utils';
import { intField, optionalText, optionalUrl, orderField, requiredText } from '@/lib/validation';
import type { Mentor } from '@/types';

const schema = z.object({
  fullName: requiredText(3, 'Ism-familiyani kiriting'),
  position: requiredText(2, 'Lavozimni kiriting'),
  bio: optionalText,
  photo: z.string().nullable(),
  experienceYears: intField(0, 50),
  studentsCount: intField(0),
  skills: z.array(z.string()),
  telegram: optionalUrl,
  instagram: optionalUrl,
  linkedin: optionalUrl,
  order: orderField,
  isActive: z.boolean(),
});

export function MentorForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Mentor>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initialData?.fullName ?? '',
      position: initialData?.position ?? '',
      bio: initialData?.bio ?? '',
      photo: initialData?.photo ?? null,
      experienceYears: initialData?.experienceYears ?? 1,
      studentsCount: initialData?.studentsCount ?? 0,
      skills: initialData?.skills ?? [],
      telegram: initialData?.telegram ?? '',
      instagram: initialData?.instagram ?? '',
      linkedin: initialData?.linkedin ?? '',
      order: initialData?.order ?? 0,
      isActive: initialData?.isActive ?? true,
    },
  });

  return (
    <FormLayout
      onSubmit={handleSubmit((values) => onSubmit(nullifyEmpty(values)))}
      onCancel={onCancel}
      submitting={isSubmitting}
    >
      <FormSection title="Shaxsiy ma'lumotlar">
        <div className="flex flex-col gap-5 sm:flex-row">
          <ImageField control={control} name="photo" aspect="square" />
          <div className="flex-1 space-y-4">
            <FormField label="Ism-familiya" htmlFor="fullName" error={errors.fullName?.message} required>
              <Input id="fullName" {...register('fullName')} />
            </FormField>
            <FormField label="Lavozimi" htmlFor="position" error={errors.position?.message} required>
              <Input id="position" placeholder="Senior Frontend Developer" {...register('position')} />
            </FormField>
          </div>
        </div>
        <FormField label="Qisqacha ma'lumot" htmlFor="bio">
          <Textarea id="bio" rows={3} {...register('bio')} />
        </FormField>
      </FormSection>

      <FormSection title="Tajriba">
        <FormRow>
          <FormField label="Tajriba (yil)" htmlFor="experienceYears" error={errors.experienceYears?.message}>
            <Input id="experienceYears" type="number" min={0} {...register('experienceYears')} />
          </FormField>
          <FormField label="O'quvchilar soni" htmlFor="studentsCount" error={errors.studentsCount?.message}>
            <Input id="studentsCount" type="number" min={0} {...register('studentsCount')} />
          </FormField>
        </FormRow>
        <TagsField control={control} name="skills" label="Ko'nikmalar" hint="Masalan: React, TypeScript" />
      </FormSection>

      <FormSection title="Ijtimoiy tarmoqlar">
        <FormField label="Telegram" htmlFor="telegram" error={errors.telegram?.message}>
          <Input id="telegram" placeholder="https://t.me/username" {...register('telegram')} />
        </FormField>
        <FormField label="Instagram" htmlFor="instagram" error={errors.instagram?.message}>
          <Input id="instagram" placeholder="https://instagram.com/username" {...register('instagram')} />
        </FormField>
        <FormField label="LinkedIn" htmlFor="linkedin" error={errors.linkedin?.message}>
          <Input id="linkedin" placeholder="https://linkedin.com/in/username" {...register('linkedin')} />
        </FormField>
      </FormSection>

      <FormSection title="Ko'rinish">
        <FormRow>
          <FormField label="Tartib raqami" htmlFor="order" error={errors.order?.message}>
            <Input id="order" type="number" min={0} {...register('order')} />
          </FormField>
        </FormRow>
        <SwitchField control={control} name="isActive" label="Saytda ko'rsatish" />
      </FormSection>
    </FormLayout>
  );
}
