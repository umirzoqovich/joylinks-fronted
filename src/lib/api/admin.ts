import { tokenStorage } from '@/lib/auth/token';
import type {
  Admin,
  Application,
  ApplicationStatus,
  DashboardOverview,
  Paginated,
  SiteSettings,
} from '@/types';

import { ApiError, request, type RequestOptions } from './http';

/** Admin panelda CRUD qilinadigan resurslar (backenddagi `/api/admin/<resource>`) */
export type AdminResource =
  | 'courses'
  | 'mentors'
  | 'testimonials'
  | 'partners'
  | 'faqs'
  | 'branches'
  | 'posts';

/** Token qo'shib so'rov yuboradi; sessiya tugagan bo'lsa login sahifasiga qaytaradi */
async function authorized<T>(path: string, options: RequestOptions = {}) {
  try {
    return await request<T>(path, { ...options, token: tokenStorage.get() });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401 && typeof window !== 'undefined') {
      tokenStorage.clear();
      window.location.replace('/admin/login');
    }
    throw error;
  }
}

export interface ApplicationsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ApplicationStatus;
}

export const adminApi = {
  // ───────────── Auth ─────────────
  login: (email: string, password: string) =>
    request<{ accessToken: string; admin: Admin }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),
  me: () => authorized<Admin>('/auth/me'),

  // ───────────── Umumiy CRUD ─────────────
  list: <T>(resource: AdminResource) => authorized<T[]>(`/admin/${resource}`),
  get: <T>(resource: AdminResource, id: string) => authorized<T>(`/admin/${resource}/${id}`),
  create: <T>(resource: AdminResource, body: unknown) =>
    authorized<T>(`/admin/${resource}`, { method: 'POST', body }),
  update: <T>(resource: AdminResource, id: string, body: unknown) =>
    authorized<T>(`/admin/${resource}/${id}`, { method: 'PATCH', body }),
  remove: (resource: AdminResource, id: string) =>
    authorized<void>(`/admin/${resource}/${id}`, { method: 'DELETE' }),

  // ───────────── Maxsus ─────────────
  dashboard: () => authorized<DashboardOverview>('/admin/dashboard'),

  applications: {
    list: (query: ApplicationsQuery) =>
      authorized<Paginated<Application>>('/admin/applications', { query: { ...query } }),
    update: (id: string, body: { status?: ApplicationStatus; note?: string | null }) =>
      authorized<Application>(`/admin/applications/${id}`, { method: 'PATCH', body }),
    remove: (id: string) => authorized<void>(`/admin/applications/${id}`, { method: 'DELETE' }),
  },

  settings: {
    get: () => request<SiteSettings>('/settings', { cache: 'no-store' }),
    update: (body: Partial<SiteSettings>) =>
      authorized<SiteSettings>('/admin/settings', { method: 'PUT', body }),
  },

  upload: (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return authorized<{ url: string }>('/admin/uploads', { method: 'POST', body });
  },
};
