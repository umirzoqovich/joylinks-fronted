'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/site/logo';
import { cn } from '@/lib/utils';

import { ADMIN_NAV } from './navigation';

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/admin' ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col bg-ink-950">
      <div className="flex h-20 items-center px-6">
        <Logo inverted />
        <span className="ml-2 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-300 uppercase">
          Admin
        </span>
      </div>

      <nav aria-label="Admin menyu" className="scrollbar-none flex-1 space-y-7 overflow-y-auto px-4 py-4">
        {ADMIN_NAV.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-all',
                        active
                          ? 'bg-brand-600 text-white shadow-glow'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      <Icon
                        className={cn(
                          'size-5 transition-colors',
                          active ? 'text-white' : 'text-slate-500 group-hover:text-accent-400',
                        )}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="m-4 rounded-2xl border border-white/10 bg-gradient-to-br from-brand-600/30 to-transparent p-4">
        <p className="text-sm font-bold text-white">Saytni ko&apos;rish</p>
        <p className="mt-1 text-xs text-slate-400">O&apos;zgarishlar ~1 daqiqada saytda paydo bo&apos;ladi.</p>
        <Link
          href="/"
          target="_blank"
          className="mt-3 inline-flex text-sm font-bold text-accent-400 hover:text-accent-300"
        >
          Saytni ochish →
        </Link>
      </div>
    </div>
  );
}
