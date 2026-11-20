'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { SwitchField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { orderField, requiredText } from '@/lib/validation';
import type { Faq } from '@/types';

const schema = z.object({
  question: requiredText(5, 'Savolni kiriting'),
  answer: requiredText(5, 'Javobni kiriting'),
  order: orderField,
  isPublished: z.boolean(),
});

export function FaqForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Faq>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      question: initialData?.question ?? '',
      answer: initialData?.answer ?? '',
      order: initialData?.order ?? 0,
      isPublished: initialData?.isPublished ?? true,
    },
  });

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)} onCancel={onCancel} submitting={isSubmitting}>
      <div className="space-y-4">
        <FormField label="Savol" htmlFor="question" error={errors.question?.message} required>
          <Input id="question" aria-invalid={Boolean(errors.question)} {...register('question')} />
        </FormField>
        <FormField label="Javob" htmlFor="answer" error={errors.answer?.message} required>
          <Textarea id="answer" rows={6} aria-invalid={Boolean(errors.answer)} {...register('answer')} />
        </FormField>
        <FormRow>
          <FormField label="Tartib raqami" htmlFor="order" error={errors.order?.message} hint="Kichik raqam — yuqorida">
            <Input id="order" type="number" min={0} {...register('order')} />
          </FormField>
        </FormRow>
        <SwitchField control={control} name="isPublished" label="Saytda ko'rsatish" />
      </div>
    </FormLayout>
  );
}
