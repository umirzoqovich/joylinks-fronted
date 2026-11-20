import { API_URL } from '@/lib/config';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | undefined | null>;
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const url = new URL(`${API_URL}/api${path}`);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

/** NestJS xato javobidan o'qiladigan matnni ajratib oladi */
function extractMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const { message } = payload as { message: string | string[] };
    return Array.isArray(message) ? message[0] : message;
  }
  return fallback;
}

/**
 * Backend API uchun yagona fetch o'rami.
 * JSON va FormData body'larni avtomatik qayta ishlaydi, xatolarni `ApiError` ko'rinishida tashlaydi.
 */
export async function request<T>(
  path: string,
  { body, token, query, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const isFormData = body instanceof FormData;

  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && !isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  if (response.status === 204) return undefined as T;

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, extractMessage(payload, `So'rovda xatolik (${response.status})`));
  }

  return payload as T;
}
