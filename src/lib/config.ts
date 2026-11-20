export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://joylinkwebsite.mcweb.uz'
).replace(/\/$/, '');
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://joylinks-fronted.mcweb.uz';

/** Ommaviy sahifalar ma'lumotlari necha soniyada yangilanadi (ISR) */
export const REVALIDATE_SECONDS = 60;
