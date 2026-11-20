import type { FormEventHandler, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormLayoutProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  submitting: boolean;
  submitLabel?: string;
  children: ReactNode;
}

/** Drawer ichidagi forma: aylantiriladigan maydonlar va pastda yopishqoq tugmalar */
export function FormLayout({
  onSubmit,
  onCancel,
  submitting,
  submitLabel = 'Saqlash',
  children,
}: FormLayoutProps) {
  return (
    <form noValidate onSubmit={onSubmit} className="flex min-h-full flex-col">
      <div className="flex-1 space-y-8 px-6 py-6 sm:px-8">{children}</div>
      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white/90 px-6 py-4 backdrop-blur sm:px-8">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Bekor qilish
        </Button>
        <Button type="submit" loading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

/** Formadagi mantiqiy bo'lim (sarlavha bilan) */
export function FormSection({ title, description, className, children }: FormSectionProps) {
  return (
    <fieldset className={cn('space-y-4', className)}>
      <legend className="mb-4">
        <span className="block text-sm font-extrabold tracking-wider text-slate-900 uppercase">{title}</span>
        {description && <span className="mt-1 block text-sm text-slate-500">{description}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

/** Ikki ustunli qator */
export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
