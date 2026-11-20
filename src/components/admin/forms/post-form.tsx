'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { ImageField, SwitchField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow, FormSection } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { nullifyEmpty } from '@/lib/utils';
import { requiredText, slugField } from '@/lib/validation';
import type { Post } from '@/types';

const schema = z.object({
  title: requiredText(5, 'Sarlavhani kiriting'),
  slug: slugField,
  excerpt: requiredText(10, 'Qisqacha mazmunni kiriting').max(300, "300 belgidan oshmasin"),
  content: requiredText(10, 'Maqola matnini kiriting'),
  cover: z.string().nullable(),
  publishedAt: z.string().min(1, 'Sanani tanlang'),
  isPublished: z.boolean(),
});

/** ISO sana → `datetime-local` input formati (mahalliy vaqt) */
function toLocalInput(iso?: string) {
  const date = iso ? new Date(iso) : new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

export function PostForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Post>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? '',
      slug: initialData?.slug ?? '',
      excerpt: initialData?.excerpt ?? '',
      content: initialData?.content ?? '',
      cover: initialData?.cover ?? null,
      publishedAt: toLocalInput(initialData?.publishedAt),
      isPublished: initialData?.isPublished ?? true,
    },
  });

  const submit = handleSubmit((values) =>
    onSubmit({
      ...nullifyEmpty(values),
      slug: values.slug || undefined,
      publishedAt: new Date(values.publishedAt).toISOString(),
    }),
  );

  return (
    <FormLayout onSubmit={submit} onCancel={onCancel} submitting={isSubmitting}>
      <FormSection title="Maqola">
        <FormField label="Sarlavha" htmlFor="title" error={errors.title?.message} required>
          <Input id="title" {...register('title')} />
        </FormField>
        <FormField
          label="Slug (URL)"
          htmlFor="slug"
          error={errors.slug?.message}
          hint="Bo'sh qoldirsangiz sarlavhadan avtomatik yasaladi"
        >
          <Input id="slug" placeholder="yangi-kurs-ochildi" {...register('slug')} />
        </FormField>
        <FormField label="Qisqacha mazmun" htmlFor="excerpt" error={errors.excerpt?.message} required>
          <Textarea id="excerpt" rows={2} {...register('excerpt')} />
        </FormField>
        <FormField
          label="To'liq matn"
          htmlFor="content"
          error={errors.content?.message}
          hint="Xatboshilarni bo'sh qator bilan ajrating"
          required
        >
          <Textarea id="content" rows={12} {...register('content')} />
        </FormField>
      </FormSection>

      <FormSection title="Muqova va nashr">
        <ImageField control={control} name="cover" />
        <FormRow>
          <FormField label="Nashr sanasi" htmlFor="publishedAt" error={errors.publishedAt?.message}>
            <Input id="publishedAt" type="datetime-local" {...register('publishedAt')} />
          </FormField>
        </FormRow>
        <SwitchField
          control={control}
          name="isPublished"
          label="Nashr qilish"
          description="O'chirilsa, maqola faqat admin panelda ko'rinadi"
        />
      </FormSection>
    </FormLayout>
  );
}
