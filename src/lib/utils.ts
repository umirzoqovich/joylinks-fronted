import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { API_URL } from '@/lib/config';

/** Tailwind klasslarini to'qnashuvsiz birlashtiradi */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1200000 → "1 200 000 so'm" */
export function formatPrice(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value).replace(/ /g, ' ')} so'm`;
}

/** 5000 → "5 000" */
export function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/ /g, ' ');
}

const MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];

/** ISO sana → "31 oktabr, 2026" */
export function formatDate(iso: string) {
  const date = new Date(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
}

/** ISO sana → "31.10.2026, 14:05" */
export function formatDateTime(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** "+998901234567" → "+998 90 123 45 67" */
export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const match = digits.match(/^998(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return match ? `+998 ${match[1]} ${match[2]} ${match[3]} ${match[4]}` : phone;
}

/** Backenddagi nisbiy fayl yo'lini to'liq URL'ga aylantiradi */
export function mediaUrl(path: string | null | undefined) {
  if (!path) return null;
  return /^https?:\/\//.test(path) ? path : `${API_URL}${path}`;
}

/** "Azizbek Karimov" → "AK" */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

/** Formadagi bo'sh satrlarni `null` ga aylantiradi (backendda maydonni tozalash uchun) */
export function nullifyEmpty<T extends Record<string, unknown>>(values: T) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      typeof value === 'string' && value.trim() === '' ? null : value,
    ]),
  ) as { [K in keyof T]: T[K] extends string ? T[K] | null : T[K] };
}

/** Hex rangni shaffoflik bilan rgba ga aylantiradi */
export function withAlpha(hex: string, alpha: number) {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
