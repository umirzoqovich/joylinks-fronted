'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { ImageField, SwitchField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow, FormSection } from '@/components/admin/form/form-layout';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { nullifyEmpty } from '@/lib/utils';
import { optionalText, optionalUrl, orderField, requiredText } from '@/lib/validation';
import type { Branch } from '@/types';

const schema = z.object({
  name: requiredText(2, 'Filial nomini kiriting'),
  address: requiredText(5, 'Manzilni kiriting'),
  landmark: optionalText,
  phone: requiredText(7, 'Telefon raqamni kiriting'),
  workingHours: requiredText(3, 'Ish vaqtini kiriting'),
  mapUrl: optionalUrl,
  image: z.string().nullable(),
  order: orderField,
  isActive: z.boolean(),
});

export function BranchForm({ initialData, onSubmit, onCancel }: ResourceFormProps<Branch>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? '',
      address: initialData?.address ?? '',
      landmark: initialData?.landmark ?? '',
      phone: initialData?.phone ?? '+998 ',
      workingHours: initialData?.workingHours ?? 'Du–Sha: 09:00 – 21:00',
      mapUrl: initialData?.mapUrl ?? '',
      image: initialData?.image ?? null,
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
      <FormSection title="Asosiy ma'lumotlar">
        <FormField label="Filial nomi" htmlFor="name" error={errors.name?.message} required>
          <Input id="name" placeholder="Chilonzor filiali" {...register('name')} />
        </FormField>
        <FormField label="Manzil" htmlFor="address" error={errors.address?.message} required>
          <Input id="address" {...register('address')} />
        </FormField>
        <FormField label="Mo'ljal" htmlFor="landmark" error={errors.landmark?.message}>
          <Input id="landmark" placeholder="Metro bekati yonida" {...register('landmark')} />
        </FormField>
        <FormRow>
          <FormField label="Telefon" htmlFor="phone" error={errors.phone?.message} required>
            <Input id="phone" type="tel" {...register('phone')} />
          </FormField>
          <FormField label="Ish vaqti" htmlFor="workingHours" error={errors.workingHours?.message} required>
            <Input id="workingHours" {...register('workingHours')} />
          </FormField>
        </FormRow>
        <FormField
          label="Xarita havolasi"
          htmlFor="mapUrl"
          error={errors.mapUrl?.message}
          hint="Google yoki Yandex xaritadagi manzil havolasi"
        >
          <Input id="mapUrl" placeholder="https://maps.google.com/..." {...register('mapUrl')} />
        </FormField>
      </FormSection>

      <FormSection title="Rasm va ko'rinish">
        <ImageField control={control} name="image" />
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
