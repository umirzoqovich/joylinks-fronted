import { ArrowLeft, CalendarDays, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { publicApi } from '@/lib/api/public';
import { formatDate, mediaUrl } from '@/lib/utils';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await publicApi.post((await params).slug);
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await publicApi.post((await params).slug);
  const cover = mediaUrl(post.cover);
  const paragraphs = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim());

  return (
    <>
      <PageHero
        title={post.title}
        breadcrumbs={[{ label: 'Yangiliklar', href: '/news' }, { label: post.title }]}
      >
        <div className="mt-6 flex items-center gap-5 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="size-4" />
            {post.views} marta ko&apos;rilgan
          </span>
        </div>
      </PageHero>

      <article className="bg-white py-10 sm:py-16 lg:py-24">
        <Container className="max-w-3xl">
          {cover && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={cover} alt={post.title} fill unoptimized className="object-cover" />
            </div>
          )}

          <p className="mb-8 text-xl leading-relaxed font-medium text-ink-950">{post.excerpt}</p>

          <div className="prose-content">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-slate-200 pt-8">
            <ButtonLink href="/news" variant="outline">
              <ArrowLeft />
              Barcha yangiliklar
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}
