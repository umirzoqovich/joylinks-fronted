'use client';

import { ExternalLink, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import { useAuth } from './auth-provider';
import { Sidebar } from './sidebar';

export function AdminShell({ children }: { children: ReactNode }) {
  const { admin, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <Sidebar />
      </aside>

      {/* Mobil sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'visible' : 'invisible',
        )}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 w-72 transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
          <button
            type="button"
            aria-label="Menyuni yopish"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 -right-12 flex size-10 items-center justify-center rounded-xl bg-white text-slate-900"
          >
            <X className="size-5" />
          </button>
        </aside>
      </div>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200/80 bg-slate-50/80 px-4 backdrop-blur-xl sm:px-8">
          <button
            type="button"
            aria-label="Menyuni ochish"
            onClick={() => setMobileOpen(true)}
            className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900 sm:inline-flex"
            >
              <ExternalLink className="size-4" />
              Sayt
            </Link>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white py-1.5 pr-1.5 pl-1.5 sm:pl-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm leading-tight font-bold text-slate-900">{admin.name}</p>
                <p className="text-xs text-slate-500">{admin.email}</p>
              </div>
              <Avatar name={admin.name} className="size-9 text-xs" />
              <button
                type="button"
                onClick={logout}
                aria-label="Chiqish"
                title="Chiqish"
                className="flex size-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
