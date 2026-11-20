import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Spinner({ className }: { className?: string }) {
  return <LoaderCircle aria-hidden className={cn('animate-spin', className)} />;
}

export function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-brand-600">
      <Spinner className="size-8" />
    </div>
  );
}
