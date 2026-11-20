'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { ImageField, SwitchField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { nullifyEmpty } from '@/lib/utils';
import { optionalUrl, orderField, requiredText } from '@/lib/validation';
import type { Partner } from '@/types';

const schema = z.object({
  name: requiredText(2, 'Kompaniya nomini kiriting'),
  website: optionalUrl,
  logo: z.string().nullable(),
  order: orderField,
  isActive: z.boolean(),
});

export function PartnerForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Partner>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? '',
      website: initialData?.website ?? '',
      logo: initialData?.logo ?? null,
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
      <div className="space-y-4">
        <FormField label="Kompaniya nomi" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
        </FormField>
        <FormField label="Veb-sayt" htmlFor="website" error={errors.website?.message}>
          <Input id="website" placeholder="https://" {...register('website')} />
        </FormField>
        <ImageField control={control} name="logo" label="Logotip" />
        <FormRow>
          <FormField label="Tartib raqami" htmlFor="order" error={errors.order?.message}>
            <Input id="order" type="number" min={0} {...register('order')} />
          </FormField>
        </FormRow>
        <SwitchField control={control} name="isActive" label="Saytda ko'rsatish" />
      </div>
    </FormLayout>
  );
}
