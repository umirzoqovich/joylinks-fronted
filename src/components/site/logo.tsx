import Image from 'next/image';
import Link from 'next/link';

import { SITE_LOGO_SRC, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Qorong'i fonda logotip oq rangda ko'rsatiladi */
  inverted?: boolean;
}

/** Logotip: `public/brand/logo.png` (shaffof fon, 1000x387) */
export function Logo({ className, inverted }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} — bosh sahifa`}
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <Image
        src={SITE_LOGO_SRC}
        alt={`${SITE_NAME} IT academy`}
        width={1000}
        height={387}
        priority
        className={cn('h-11 w-auto transition-[filter] duration-300', inverted && 'brightness-0 invert')}
      />
    </Link>
  );
}
