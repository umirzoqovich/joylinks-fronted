import Image from 'next/image';
import Link from 'next/link';

import { formatDate, mediaUrl } from '@/lib/utils';
import type { PostSummary } from '@/types';

export function PostCard({ post }: { post: PostSummary }) {
  const cover = mediaUrl(post.cover);

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
        {cover && (
          <Image
            src={cover}
            alt={post.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <p className="mt-5 text-sm text-slate-600">
        {formatDate(post.publishedAt)} · {post.views} ko&apos;rish
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink-950 underline-offset-4 group-hover:underline">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-slate-600">{post.excerpt}</p>
    </Link>
  );
}
