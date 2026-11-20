import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHero } from '@/components/site/page-hero';
import { PostCard } from '@/components/site/post-card';
import { Reveal } from '@/components/site/reveal';
import { buttonStyles } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { publicApi } from '@/lib/api/public';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Yangiliklar',
  description: "Joylinks hayotidagi so'nggi yangiliklar, tadbirlar va e'lonlar.",
};

interface NewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const { items: posts, meta } = await publicApi.posts(page);

  return (
    <>
      <PageHero
        title="Yangiliklar"
        description="Joylinks hayotidagi so'nggi voqealar, yangi kurslar va tadbirlar haqida."
        breadcrumbs={[{ label: 'Yangiliklar' }]}
      />

      <section className="bg-white py-14 sm:py-24 lg:py-32">
        <Container>
          {posts.length === 0 ? (
            <EmptyState title="Hozircha yangiliklar yo'q" />
          ) : (
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.id} delay={(index % 3) * 0.06} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          {meta.totalPages > 1 && (
            <nav aria-label="Sahifalar" className="mt-14 flex items-center justify-center gap-2">
              <PageLink page={page - 1} disabled={page <= 1} label="Oldingi">
                <ChevronLeft />
              </PageLink>
              {Array.from({ length: meta.totalPages }, (_, index) => index + 1).map((number) => (
                <PageLink key={number} page={number} active={number === page} label={`${number}-sahifa`}>
                  {number}
                </PageLink>
              ))}
              <PageLink page={page + 1} disabled={page >= meta.totalPages} label="Keyingi">
                <ChevronRight />
              </PageLink>
            </nav>
          )}
        </Container>
      </section>
    </>
  );
}

interface PageLinkProps {
  page: number;
  label: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

function PageLink({ page, label, active, disabled, children }: PageLinkProps) {
  const className = cn(
    buttonStyles({ variant: active ? 'primary' : 'outline', size: 'icon' }),
    disabled && 'pointer-events-none opacity-40',
  );

  return (
    <Link
      href={`/news?page=${page}`}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
