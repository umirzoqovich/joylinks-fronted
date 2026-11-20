'use client';

import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Logo } from './logo';
import { SITE_NAV } from './nav-links';

const TOP_THRESHOLD_PX = 24;

export function Header({ phone }: { phone?: string }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [overDark, setOverDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar orqasida qaysi bo'lim turganini aniqlaymiz: to'q bo'limda matn oq, oq bo'limda qora
  useEffect(() => {
    let frame = 0;
    const detect = () => {
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !headerRef.current?.contains(el));
      // Faqat sahifa tepasida (hero ustida) shaffof; pastga tushganda doim oq panel
      const atTop = window.scrollY < TOP_THRESHOLD_PX;
      setOverDark(atTop && Boolean(under?.closest('[data-header-theme="dark"]')));
    };
    const onChange = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detect);
    };
    onChange();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, [pathname]);

  // Sahifa almashganda mobil menyuni yopamiz
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape bosilganda menyuni yopamiz
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);

  const onLight = !menuOpen && !overDark;

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        onLight && 'bg-white/85 shadow-[0_1px_0_rgb(15_24_38/0.08)] backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo inverted={!onLight} />

        <nav
          aria-label="Asosiy menyu"
          className="hidden flex-1 items-center justify-center gap-10 lg:flex"
        >
          {SITE_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative py-2 text-[15px] font-medium transition-colors',
                'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                isActive(link.href) && 'after:scale-x-100',
                onLight
                  ? isActive(link.href)
                    ? 'text-brand-600'
                    : 'text-ink-950 hover:text-brand-600'
                  : isActive(link.href)
                    ? 'text-brand-400'
                    : 'text-white/90 hover:text-brand-400',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
{phone && (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className={cn(
              'hidden items-center gap-2 text-sm font-semibold transition-colors xl:flex',
              onLight ? 'text-ink-950 hover:text-brand-600' : 'text-white hover:text-brand-400',
            )}
          >
            <Phone className={cn('size-4', onLight ? 'text-brand-600' : 'text-brand-400')} />
            {phone}
          </a>
)}
          <ButtonLink
            href="/#apply"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Ro&apos;yxatdan o&apos;tish
          </ButtonLink>
          <button
            type="button"
            aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              'flex size-10 items-center justify-center rounded-full border transition-colors lg:hidden',
              onLight
                ? 'border-slate-300 text-ink-950 hover:bg-slate-100'
                : 'border-white/25 text-white hover:bg-white/10',
            )}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 border-t border-white/10 bg-ink-950 p-6 transition-all duration-300 lg:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <nav aria-label="Mobil menyu" className="flex flex-col gap-1">
          {SITE_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-4 text-2xl font-bold text-white transition hover:bg-white/10 hover:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-x-6 bottom-6 space-y-3">
          <ButtonLink href="/#apply" variant="bright" size="lg" className="w-full">
            Ro&apos;yxatdan o&apos;tish
          </ButtonLink>
{phone && (
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 py-2 font-semibold text-slate-200"
          >
            <Phone className="size-4" />
            {phone}
          </a>
)}
        </div>
      </div>
    </header>
  );
}
