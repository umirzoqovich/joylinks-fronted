import { ArrowLeft } from 'lucide-react';

import { Logo } from '@/components/site/logo';
import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-4 text-center">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[120px]" />

      <Logo inverted className="mb-12" />
      <p className="text-gradient text-[8rem] leading-none font-extrabold sm:text-[12rem]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Sahifa topilmadi</h1>
      <p className="mt-3 max-w-md text-slate-400">
        Siz izlagan sahifa mavjud emas yoki boshqa manzilga ko&apos;chirilgan.
      </p>
      <ButtonLink href="/" variant="accent" size="lg" className="mt-10">
        <ArrowLeft />
        Bosh sahifaga qaytish
      </ButtonLink>
    </main>
  );
}
