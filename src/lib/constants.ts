import type { ApplicationStatus, CourseFormat, CourseLevel } from '@/types';

export const SITE_NAME = 'Joylinks';

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  BEGINNER: "Boshlang'ich",
  INTERMEDIATE: "O'rta",
  ADVANCED: 'Yuqori',
};

export const COURSE_FORMAT_LABELS: Record<CourseFormat, string> = {
  OFFLINE: 'Offline',
  ONLINE: 'Online',
  HYBRID: 'Gibrid',
};

export const APPLICATION_STATUS: Record<
  ApplicationStatus,
  { label: string; tone: 'blue' | 'amber' | 'green' | 'red' }
> = {
  NEW: { label: 'Yangi', tone: 'blue' },
  CONTACTED: { label: "Bog'lanildi", tone: 'amber' },
  ENROLLED: { label: "O'qishga yozildi", tone: 'green' },
  REJECTED: { label: 'Rad etildi', tone: 'red' },
};

/** Rasmiy Instagram sahifasi — video kartalar shu manzilga olib boradi */
export const INSTAGRAM_URL =
  'https://www.instagram.com/joylinks_termiz?utm_source=ig_web_button_share_sheet&lqvp=ZDNlZDc0MzIxNw==';

/** Akademiya tashkil topgan yil */
export const SITE_FOUNDED_YEAR = 2019;

/** Bosh sahifadagi asosiy ko'rsatkichlar (hero) */
export const SITE_STATS: readonly { value: number; suffix: string; label: string }[] = [
  { value: 5, suffix: '', label: 'Filiallar' },
  { value: 200, suffix: '+', label: 'Xodimlar' },
  { value: 2000, suffix: '+', label: 'Ishga kirgan IT mutaxassislar' },
  { value: 10000, suffix: '+', label: 'Bitiruvchilar' },
];

/** Logotip fayli (`public/brand/logo.png`, shaffof fon) */
export const SITE_LOGO_SRC = '/brand/logo.png';

/** Aloqa ma'lumotlari (bazada telefon bo'sh bo'lsa shu qiymatlar ishlatiladi) */
export const CONTACT_PHONE = '+998 99 287 32 20';
export const CONTACT_ADDRESS =
  "Surxondaryo viloyati, Termiz shahar, Alpomish MFY, Alisher Navoiy ko'chasi, 28b-uy";

/** "Biz haqimizda" bo'limidagi tarixiy bosqichlar. Yangi bosqichlarni shu yerga qo'shing. */
export interface TimelineItem {
  year: string;
  text: string;
}

export const ABOUT_TIMELINE: readonly TimelineItem[] = [
  { year: String(SITE_FOUNDED_YEAR), text: "Joylinks IT Academy tashkil topdi va birinchi guruhlarga qabul boshlandi." },
];
