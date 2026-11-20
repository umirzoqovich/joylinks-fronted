import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

import { Reveal } from './reveal';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  children?: ReactNode;
  className?: string;
}

/** Ichki sahifalar uchun oddiy, oq sarlavha bloki */
export function PageHero({ title, description, breadcrumbs = [], children, className }: PageHeroProps) {
  return (
    <section className={cn('border-b border-slate-200 bg-white pt-32 pb-12 lg:pb-16', className)}>
      <Container>
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-ink-950">
                  Bosh sahifa
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-ink-950">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-950">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-ink-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{description}</p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
