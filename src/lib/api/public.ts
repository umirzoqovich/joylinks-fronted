import 'server-only';

import { notFound } from 'next/navigation';

import { REVALIDATE_SECONDS } from '@/lib/config';
import type {
  Branch,
  CourseDetails,
  CourseSummary,
  Faq,
  Paginated,
  Partner,
  Post,
  PostSummary,
  PublicMentor,
  SiteSettings,
  Testimonial,
} from '@/types';

import { ApiError, request } from './http';

/**
 * Sayt sahifalari uchun server tomonda ishlaydigan so'rovlar.
 * Backend vaqtincha ishlamasa, sahifa buzilmasligi uchun zaxira qiymat qaytariladi.
 */
async function safeGet<T>(path: string, fallback: T, query?: Record<string, string | number>) {
  try {
    return await request<T>(path, { query, next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    console.error(`[api] GET ${path} bajarilmadi:`, (error as Error).message);
    return fallback;
  }
}

/** Bitta yozuv sahifalari uchun: topilmasa 404 sahifasini ko'rsatadi */
async function getOrNotFound<T>(path: string) {
  try {
    return await request<T>(path, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  heroBadge: 'Yangi guruhlarga qabul ochiq',
  heroTitle: 'Joylinks IT Academy — Termiz filiali',
  heroSubtitle:
    "Amaliyotga yo'naltirilgan IT kurslar, tajribali mentorlar va ishga joylashishda yordam.",
  phone: '',
  email: '',
  address: 'Termiz sh., Surxondaryo viloyati',
  telegram: 'https://t.me/joylinks_it_academy',
  instagram: 'https://www.instagram.com/joylinks_it_academy/',
  youtube: null,
  facebook: null,
  graduatesCount: 0,
  employmentRate: 0,
  mentorsCount: 0,
  yearsOfExperience: 0,
  updatedAt: new Date(0).toISOString(),
};

const EMPTY_PAGE: Paginated<never> = { items: [], meta: { total: 0, page: 1, limit: 12, totalPages: 1 } };

export const publicApi = {
  settings: () => safeGet<SiteSettings>('/settings', DEFAULT_SETTINGS),
  courses: () => safeGet<CourseSummary[]>('/courses', []),
  course: (slug: string) => getOrNotFound<CourseDetails>(`/courses/${encodeURIComponent(slug)}`),
  mentors: () => safeGet<PublicMentor[]>('/mentors', []),
  testimonials: () => safeGet<Testimonial[]>('/testimonials', []),
  partners: () => safeGet<Partner[]>('/partners', []),
  faqs: () => safeGet<Faq[]>('/faqs', []),
  branches: () => safeGet<Branch[]>('/branches', []),
  posts: (page = 1, limit = 9) =>
    safeGet<Paginated<PostSummary>>('/posts', EMPTY_PAGE, { page, limit }),
  post: (slug: string) => getOrNotFound<Post>(`/posts/${encodeURIComponent(slug)}`),
};
