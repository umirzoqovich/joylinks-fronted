'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Check, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { ResourceFormProps } from '@/components/admin/crud-page';
import { SwitchField, TagsField } from '@/components/admin/form/controlled';
import { FormLayout, FormRow, FormSection } from '@/components/admin/form/form-layout';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { COURSE_ICONS } from '@/components/ui/course-icon';
import { FormField } from '@/components/ui/form-field';
import { Input, Select, Textarea } from '@/components/ui/input';
import { resourceKeys } from '@/hooks/use-resource';
import { adminApi } from '@/lib/api/admin';
import { COURSE_FORMAT_LABELS, COURSE_LEVEL_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { intField, optionalIntString, orderField, requiredText, slugField } from '@/lib/validation';
import type { AdminCourseDetails, CourseFormat, CourseLevel, Mentor } from '@/types';

const COLOR_PRESETS = ['#0eb182', '#00dd9d', '#0a8f68', '#087555', '#4fdcb5', '#085c44', '#8eead0', '#074a38'];

const schema = z.object({
  title: requiredText(2, 'Kurs nomini kiriting'),
  slug: slugField,
  shortDescription: requiredText(10, 'Qisqa tavsifni kiriting').max(240, '240 belgidan oshmasin'),
  description: requiredText(10, "To'liq tavsifni kiriting"),
  icon: z.string(),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, "Rang #RRGGBB formatida bo'lsin"),
  durationMonths: intField(1, 36),
  lessonsPerWeek: intField(1, 7),
  lessonHours: intField(1, 8),
  price: intField(0),
  oldPrice: optionalIntString,
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  format: z.enum(['OFFLINE', 'ONLINE', 'HYBRID']),
  skills: z.array(z.string()),
  curriculum: z.array(
    z.object({
      title: requiredText(2, 'Modul nomini kiriting'),
      topics: z.string(),
    }),
  ),
  mentorIds: z.array(z.string()),
  isPopular: z.boolean(),
  isPublished: z.boolean(),
  order: orderField,
});

type CourseFormValues = z.output<typeof schema>;

function toDefaults(course?: AdminCourseDetails) {
  return {
    title: course?.title ?? '',
    slug: course?.slug ?? '',
    shortDescription: course?.shortDescription ?? '',
    description: course?.description ?? '',
    icon: course?.icon ?? 'code',
    color: course?.color ?? COLOR_PRESETS[0],
    durationMonths: course?.durationMonths ?? 6,
    lessonsPerWeek: course?.lessonsPerWeek ?? 3,
    lessonHours: course?.lessonHours ?? 2,
    price: course?.price ?? 0,
    oldPrice: course?.oldPrice ? String(course.oldPrice) : '',
    level: course?.level ?? ('BEGINNER' as CourseLevel),
    format: course?.format ?? ('OFFLINE' as CourseFormat),
    skills: course?.skills ?? [],
    curriculum: (course?.curriculum ?? []).map((module) => ({
      title: module.title,
      topics: module.topics.join('\n'),
    })),
    mentorIds: course?.mentorIds ?? [],
    isPopular: course?.isPopular ?? false,
    isPublished: course?.isPublished ?? true,
    order: course?.order ?? 0,
  };
}

/** Forma qiymatlarini backend DTO ko'rinishiga keltiradi */
function toPayload(values: CourseFormValues) {
  return {
    ...values,
    slug: values.slug || undefined,
    oldPrice: values.oldPrice ? Number(values.oldPrice) : null,
    curriculum: values.curriculum.map((module) => ({
      title: module.title,
      topics: module.topics
        .split('\n')
        .map((topic) => topic.trim())
        .filter(Boolean),
    })),
  };
}

export function CourseForm({ initialData, onSubmit, onCancel }: ResourceFormProps<AdminCourseDetails>) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: toDefaults(initialData) });

  const curriculum = useFieldArray({ control, name: 'curriculum' });
  const color = watch('color');

  return (
    <FormLayout
      onSubmit={handleSubmit((values) => onSubmit(toPayload(values)))}
      onCancel={onCancel}
      submitting={isSubmitting}
    >
      <FormSection title="Asosiy ma'lumotlar">
        <FormRow>
          <FormField label="Kurs nomi" htmlFor="title" error={errors.title?.message} required>
            <Input id="title" placeholder="Frontend dasturlash" {...register('title')} />
          </FormField>
          <FormField label="Slug (URL)" htmlFor="slug" error={errors.slug?.message} hint="Bo'sh bo'lsa avtomatik">
            <Input id="slug" placeholder="frontend" {...register('slug')} />
          </FormField>
        </FormRow>
        <FormField label="Qisqa tavsif" htmlFor="shortDescription" error={errors.shortDescription?.message} required>
          <Textarea id="shortDescription" rows={2} {...register('shortDescription')} />
        </FormField>
        <FormField label="To'liq tavsif" htmlFor="description" error={errors.description?.message} required>
          <Textarea id="description" rows={5} {...register('description')} />
        </FormField>
      </FormSection>

      <FormSection title="Ko'rinish" description="Kurs kartochkasidagi ikonka va rang">
        <Controller
          control={control}
          name="icon"
          render={({ field }) => (
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(COURSE_ICONS).map(([name, Icon]) => {
                const selected = field.value === name;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    aria-pressed={selected}
                    onClick={() => field.onChange(name)}
                    className={cn(
                      'flex aspect-square items-center justify-center rounded-xl border transition',
                      selected ? 'border-transparent text-white shadow-lg' : 'border-slate-200 text-slate-500 hover:border-slate-300',
                    )}
                    style={selected ? { backgroundColor: color } : undefined}
                  >
                    <Icon className="size-5" />
                  </button>
                );
              })}
            </div>
          )}
        />

        <FormField label="Rang" error={errors.color?.message}>
          <div className="flex flex-wrap items-center gap-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                aria-label={`Rang ${preset}`}
                onClick={() => setValue('color', preset, { shouldDirty: true })}
                className="flex size-9 items-center justify-center rounded-full ring-offset-2 transition hover:scale-110"
                style={{ backgroundColor: preset, boxShadow: color === preset ? `0 0 0 2px white, 0 0 0 4px ${preset}` : undefined }}
              >
                {color === preset && <Check className="size-4 text-white" />}
              </button>
            ))}
            <label className="ml-2 flex items-center gap-2 rounded-xl border border-slate-200 py-1 pr-3 pl-1 text-sm font-mono text-slate-600">
              <input type="color" className="size-7 cursor-pointer rounded-lg border-0 bg-transparent" {...register('color')} />
              {color}
            </label>
          </div>
        </FormField>
      </FormSection>

      <FormSection title="Narx va jadval">
        <FormRow>
          <FormField label="Oylik narx (so'm)" htmlFor="price" error={errors.price?.message} required>
            <Input id="price" type="number" min={0} step={10000} {...register('price')} />
          </FormField>
          <FormField label="Eski narx (chegirma uchun)" htmlFor="oldPrice" error={errors.oldPrice?.message}>
            <Input id="oldPrice" inputMode="numeric" placeholder="Ixtiyoriy" {...register('oldPrice')} />
          </FormField>
        </FormRow>
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Davomiyligi (oy)" htmlFor="durationMonths" error={errors.durationMonths?.message}>
            <Input id="durationMonths" type="number" min={1} {...register('durationMonths')} />
          </FormField>
          <FormField label="Haftasiga darslar" htmlFor="lessonsPerWeek" error={errors.lessonsPerWeek?.message}>
            <Input id="lessonsPerWeek" type="number" min={1} max={7} {...register('lessonsPerWeek')} />
          </FormField>
          <FormField label="Dars (soat)" htmlFor="lessonHours" error={errors.lessonHours?.message}>
            <Input id="lessonHours" type="number" min={1} max={8} {...register('lessonHours')} />
          </FormField>
        </div>
        <FormRow>
          <FormField label="Daraja" htmlFor="level">
            <Select id="level" {...register('level')}>
              {Object.entries(COURSE_LEVEL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Format" htmlFor="format">
            <Select id="format" {...register('format')}>
              {Object.entries(COURSE_FORMAT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormField>
        </FormRow>
      </FormSection>

      <FormSection title="O'quv dasturi">
        <TagsField control={control} name="skills" label="O'rganiladigan texnologiyalar" hint="Masalan: HTML, CSS, React" />

        <div className="space-y-3">
          {curriculum.fields.map((field, index) => (
            <div key={field.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="mb-3 flex items-center gap-2">
                <GripVertical className="size-4 text-slate-300" />
                <span className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                  Modul {index + 1}
                </span>
                <button
                  type="button"
                  aria-label="Modulni o'chirish"
                  onClick={() => curriculum.remove(index)}
                  className="ml-auto flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="space-y-3">
                <FormField error={errors.curriculum?.[index]?.title?.message}>
                  <Input placeholder="Modul nomi" className="bg-white" {...register(`curriculum.${index}.title`)} />
                </FormField>
                <Textarea
                  rows={3}
                  placeholder={'Mavzular — har biri yangi qatorda'}
                  className="bg-white"
                  {...register(`curriculum.${index}.topics`)}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => curriculum.append({ title: '', topics: '' })}>
            <Plus />
            Modul qo&apos;shish
          </Button>
        </div>
      </FormSection>

      <FormSection title="Mentorlar">
        <Controller
          control={control}
          name="mentorIds"
          render={({ field }) => <MentorPicker value={field.value} onChange={field.onChange} />}
        />
      </FormSection>

      <FormSection title="Holat">
        <FormRow>
          <FormField label="Tartib raqami" htmlFor="order" error={errors.order?.message}>
            <Input id="order" type="number" min={0} {...register('order')} />
          </FormField>
        </FormRow>
        <SwitchField control={control} name="isPopular" label="Mashhur kurs" description="Kartochkada «Mashhur» belgisi chiqadi" />
        <SwitchField control={control} name="isPublished" label="Saytda ko'rsatish" />
      </FormSection>
    </FormLayout>
  );
}

function MentorPicker({ value, onChange }: { value: string[]; onChange: (ids: string[]) => void }) {
  const { data: mentors = [], isLoading } = useQuery({
    queryKey: resourceKeys.list('mentors'),
    queryFn: () => adminApi.list<Mentor>('mentors'),
  });

  if (isLoading) return <p className="text-sm text-slate-500">Yuklanmoqda...</p>;
  if (mentors.length === 0) return <p className="text-sm text-slate-500">Avval mentor qo&apos;shing.</p>;

  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id]);

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {mentors.map((mentor) => {
        const selected = value.includes(mentor.id);
        return (
          <button
            key={mentor.id}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(mentor.id)}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-2.5 text-left transition',
              selected ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/15' : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <Avatar name={mentor.fullName} src={mentor.photo} className="size-9 text-xs" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-slate-900">{mentor.fullName}</span>
              <span className="block truncate text-xs text-slate-500">{mentor.position}</span>
            </span>
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-md border',
                selected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300',
              )}
            >
              {selected && <Check className="size-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
