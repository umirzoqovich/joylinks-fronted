'use client';

import { Eye } from 'lucide-react';

import { MutedCell, TextCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { PostForm } from '@/components/admin/forms/post-form';
import { formatDate } from '@/lib/utils';
import type { Post, PostSummary } from '@/types';

export default function PostsAdminPage() {
  return (
    <CrudPage<PostSummary, Post>
      resource="posts"
      title="Yangiliklar"
      description="Blog va e'lonlar"
      entityName="yangilik"
      fetchDetails
      drawerSize="lg"
      searchText={(post) => post.title}
      renderForm={(props) => <PostForm {...props} />}
      columns={[
        {
          key: 'title',
          header: 'Sarlavha',
          cell: (post) => <TextCell title={post.title} subtitle={post.excerpt} />,
        },
        {
          key: 'date',
          header: 'Sana',
          cell: (post) => <MutedCell>{formatDate(post.publishedAt)}</MutedCell>,
        },
        {
          key: 'views',
          header: "Ko'rishlar",
          cell: (post) => (
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Eye className="size-4 text-slate-400" />
              {post.views}
            </span>
          ),
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (post) => <VisibilityBadge visible={post.isPublished} />,
        },
      ]}
    />
  );
}
