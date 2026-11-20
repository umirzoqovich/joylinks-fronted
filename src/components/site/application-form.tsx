'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Select } from '@/components/ui/input';
import { request } from '@/lib/api/http';
import type { CourseSummary } from '@/types';

const PHONE_PREFIX = '+998 ';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Ismingizni kiriting'),
  phone: z
    .string()
    .refine((value) => value.replace(/\D/g, '').length === 12, "Telefon raqamni to'liq kiriting"),
  courseId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** "998901234567" → "+998 90 123 45 67" (yozish jarayonida) */
function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^998/, '').slice(0, 9);
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
  return PHONE_PREFIX + parts.filter(Boolean).join(' ');
}

interface ApplicationFormProps {
  courses: Pick<CourseSummary, 'id' | 'title'>[];
  defaultCourseId?: string;
}

export function ApplicationForm({ courses, defaultCourseId }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', phone: PHONE_PREFIX, courseId: defaultCourseId ?? '' },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      await request('/applications', {
        method: 'POST',
        body: { ...values, courseId: values.courseId || undefined },
      });
      setSubmitted(true);
      reset();
    } catch (error) {
      setServerError((error as Error).message);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="border-t border-slate-200 pt-6">
        <h3 className="text-xl font-semibold text-ink-950">Arizangiz qabul qilindi</h3>
        <p className="mt-2 max-w-sm text-slate-600">
          Menejerimiz tez orada siz bilan bog&apos;lanadi. E&apos;tiboringiz uchun rahmat!
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-lg text-sm font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Yana ariza qoldirish
        </button>
      </div>
    );
  }

  const phoneField = register('phone');

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <FormField label="Ismingiz" htmlFor="app-name" error={errors.fullName?.message}>
        <Input
          id="app-name"
          placeholder="Ism va familiya"
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          aria-required="true"
          aria-describedby={errors.fullName ? 'app-name-error' : undefined}
          {...register('fullName')}
        />
      </FormField>

      <FormField label="Telefon raqam" htmlFor="app-phone" error={errors.phone?.message}>
        <Input
          id="app-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-required="true"
          aria-describedby={errors.phone ? 'app-phone-error' : undefined}
          {...phoneField}
          onChange={(event) => {
            setValue('phone', maskPhone(event.target.value), { shouldValidate: Boolean(errors.phone) });
          }}
        />
      </FormField>

      {courses.length > 0 && (
        <FormField label="Qiziqtirgan kurs" htmlFor="app-course">
          <Select id="app-course" {...register('courseId')}>
            <option value="">Hali aniq emas</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Select>
        </FormField>
      )}

      {serverError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" loading={isSubmitting}>
        Ariza yuborish
      </Button>

      <p className="text-xs text-slate-600">
        Tugmani bosish orqali shaxsiy ma&apos;lumotlarni qayta ishlashga rozilik bildirasiz.
      </p>
    </form>
  );
}
