'use client';

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { FormField } from '@/components/ui/form-field';
import { Switch } from '@/components/ui/switch';

import { ImageUpload } from './image-upload';
import { TagsInput } from './tags-input';

/**
 * react-hook-form bilan ishlaydigan boshqariladigan maydonlar.
 * Har bir formada `Controller` ni qayta yozmaslik uchun.
 */

interface ControlledProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: ControlledProps<T> & { description?: string }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch checked={Boolean(field.value)} onChange={field.onChange} label={label} description={description} />
      )}
    />
  );
}

export function ImageField<T extends FieldValues>({
  control,
  name,
  label,
  aspect,
}: ControlledProps<T> & { aspect?: 'square' | 'wide' }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormField label={label}>
          <ImageUpload value={field.value} onChange={field.onChange} aspect={aspect} />
        </FormField>
      )}
    />
  );
}

export function TagsField<T extends FieldValues>({
  control,
  name,
  label,
  hint,
}: ControlledProps<T> & { hint?: string }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormField label={label} htmlFor={name} hint={hint}>
          <TagsInput id={name} value={field.value ?? []} onChange={field.onChange} />
        </FormField>
      )}
    />
  );
}
