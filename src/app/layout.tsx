import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { SITE_NAME } from '@/lib/constants';
import { SITE_URL } from '@/lib/config';

import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — zamonaviy IT akademiya`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Joylinks — Toshkentdagi zamonaviy IT o'quv markazi. Frontend, Backend, Mobil dasturlash, UI/UX dizayn va Data Science kurslari.",
  keywords: ['IT kurslar', 'dasturlash', 'Toshkent', "o'quv markazi", 'Frontend', 'Backend', 'Joylinks'],
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    siteName: SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
