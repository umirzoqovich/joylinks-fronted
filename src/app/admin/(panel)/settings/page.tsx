'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { PageLoader } from '@/components/ui/spinner';
import { adminApi } from '@/lib/api/admin';
import { nullifyEmpty } from '@/lib/utils';
import { intField, optionalUrl, requiredText } from '@/lib/validation';
import type { SiteSettings } from '@/types';

const schema = z.object({
  heroBadge: requiredText(2).max(80),
  heroTitle: requiredText(5).max(120),
  heroSubtitle: requiredText(10).max(300),
  phone: requiredText(7, 'Telefon raqamni kiriting'),
  email: z.string().trim().email("Email noto'g'ri formatda"),
  address: requiredText(3, 'Manzilni kiriting'),
  telegram: optionalUrl,
  instagram: optionalUrl,
  youtube: optionalUrl,
  facebook: optionalUrl,
  graduatesCount: intField(0),
  employmentRate: intField(0, 100),
  mentorsCount: intField(0),
  yearsOfExperience: intField(0),
});

const SETTINGS_KEY = ['admin', 'settings'];

export default function SettingsPage() {
  const { data, isLoading } = useQuery({ queryKey: SETTINGS_KEY, queryFn: adminApi.settings.get });

  if (isLoading || !data) return <PageLoader />;
  return <SettingsForm settings={data} />;
}

function SettingsForm({ settings }: { settings: SiteSettings }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(settings),
  });

  const save = useMutation({
    mutationFn: adminApi.settings.update,
    onSuccess: (updated) => {
      queryClient.setQueryData(SETTINGS_KEY, updated);
      reset(toFormValues(updated));
      toast.success('Sozlamalar saqlandi');
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = handleSubmit((values) => save.mutate(nullifyEmpty(values) as Partial<SiteSettings>));

  return (
    <form noValidate onSubmit={onSubmit}>
      <PageHeader
        title="Sozlamalar"
        description="Sayt matnlari, aloqa ma'lumotlari va statistika"
        actions={
          <Button type="submit" loading={save.isPending} disabled={!isDirty}>
            {!save.isPending && <Save />}
            Saqlash
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <SettingsCard title="Bosh sahifa" description="Birinchi ekrandagi sarlavha va matn">
          <FormField label="Nishon matni" htmlFor="heroBadge" error={errors.heroBadge?.message}>
            <Input id="heroBadge" {...register('heroBadge')} />
          </FormField>
          <FormField
            label="Sarlavha"
            htmlFor="heroTitle"
            error={errors.heroTitle?.message}
            hint="Oxirgi ikki so'z gradient rangda ko'rsatiladi"
          >
            <Input id="heroTitle" {...register('heroTitle')} />
          </FormField>
          <FormField label="Tavsif" htmlFor="heroSubtitle" error={errors.heroSubtitle?.message}>
            <Textarea id="heroSubtitle" rows={3} {...register('heroSubtitle')} />
          </FormField>
        </SettingsCard>

        <SettingsCard title="Statistika" description="Bosh sahifadagi raqamlar">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Bitiruvchilar soni" htmlFor="graduatesCount" error={errors.graduatesCount?.message}>
              <Input id="graduatesCount" type="number" min={0} {...register('graduatesCount')} />
            </FormField>
            <FormField label="Ishga joylashish (%)" htmlFor="employmentRate" error={errors.employmentRate?.message}>
              <Input id="employmentRate" type="number" min={0} max={100} {...register('employmentRate')} />
            </FormField>
            <FormField label="Mentorlar soni" htmlFor="mentorsCount" error={errors.mentorsCount?.message}>
              <Input id="mentorsCount" type="number" min={0} {...register('mentorsCount')} />
            </FormField>
            <FormField label="Tajriba (yil)" htmlFor="yearsOfExperience" error={errors.yearsOfExperience?.message}>
              <Input id="yearsOfExperience" type="number" min={0} {...register('yearsOfExperience')} />
            </FormField>
          </div>
        </SettingsCard>

        <SettingsCard title="Aloqa ma'lumotlari">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Telefon" htmlFor="phone" error={errors.phone?.message}>
              <Input id="phone" type="tel" {...register('phone')} />
            </FormField>
            <FormField label="Email" htmlFor="email" error={errors.email?.message}>
              <Input id="email" type="email" {...register('email')} />
            </FormField>
          </div>
          <FormField label="Bosh ofis manzili" htmlFor="address" error={errors.address?.message}>
            <Input id="address" {...register('address')} />
          </FormField>
        </SettingsCard>

        <SettingsCard title="Ijtimoiy tarmoqlar" description="Bo'sh qoldirilgan tarmoqlar saytda ko'rinmaydi">
          {(['telegram', 'instagram', 'youtube', 'facebook'] as const).map((network) => (
            <FormField
              key={network}
              label={network.charAt(0).toUpperCase() + network.slice(1)}
              htmlFor={network}
              error={errors[network]?.message}
            >
              <Input id={network} placeholder="https://" {...register(network)} />
            </FormField>
          ))}
        </SettingsCard>
      </div>
    </form>
  );
}

/** API javobini forma qiymatlariga keltiradi (null → bo'sh satr) */
function toFormValues({ id: _id, updatedAt: _updatedAt, ...settings }: SiteSettings) {
  return {
    ...settings,
    telegram: settings.telegram ?? '',
    instagram: settings.instagram ?? '',
    youtube: settings.youtube ?? '',
    facebook: settings.facebook ?? '',
  };
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
      <header className="mb-2">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </header>
      {children}
    </section>
  );
}
