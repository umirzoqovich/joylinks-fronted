'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, LogIn, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Logo } from '@/components/site/logo';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { adminApi } from '@/lib/api/admin';
import { tokenStorage } from '@/lib/auth/token';

const schema = z.object({
  email: z.string().trim().email("Email noto'g'ri formatda"),
  password: z.string().min(6, 'Parol kamida 6 ta belgi'),
});

type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Allaqachon tizimga kirgan bo'lsa — to'g'ridan-to'g'ri panelga
  useEffect(() => {
    if (tokenStorage.get()) router.replace('/admin');
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async ({ email, password }: LoginValues) => {
    setError(null);
    try {
      const { accessToken } = await adminApi.login(email, password);
      tokenStorage.set(accessToken);
      router.replace('/admin');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Chap tomon — brend paneli */}
      <section className="relative hidden overflow-hidden bg-ink-950 p-12 lg:flex lg:flex-col">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-32 -left-32 size-[30rem] rounded-full bg-brand-600/40 blur-[120px]" />
        <div className="absolute -right-20 -bottom-32 size-96 rounded-full bg-accent-500/15 blur-[100px]" />

        <Logo inverted className="relative" />
        <div className="relative mt-auto max-w-md">
          <h1 className="text-4xl leading-tight font-extrabold text-white">
            Sayt kontentini <span className="text-gradient">bir joydan</span> boshqaring
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Kurslar, mentorlar, arizalar va sozlamalar — barchasi Joylinks admin panelida.
          </p>
        </div>
      </section>

      {/* O'ng tomon — forma */}
      <section className="flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-sm">
          <Logo className="mb-10 lg:hidden" />
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Xush kelibsiz!</h2>
          <p className="mt-2 text-slate-500">Davom etish uchun hisobingizga kiring.</p>

          <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <FormField label="Email" htmlFor="email" error={errors.email?.message}>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@joylinks.uz"
                  className="pl-11"
                  aria-invalid={Boolean(errors.email)}
                  {...register('email')}
                />
              </div>
            </FormField>

            <FormField label="Parol" htmlFor="password" error={errors.password?.message}>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-11"
                  aria-invalid={Boolean(errors.password)}
                  {...register('password')}
                />
              </div>
            </FormField>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
              {!isSubmitting && <LogIn />}
              Kirish
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
