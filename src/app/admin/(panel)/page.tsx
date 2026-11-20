'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, BookOpen, Inbox, MessageSquareQuote, Users, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { ApplicationStatusBadge } from '@/components/admin/application-status-badge';
import { useAuth } from '@/components/admin/auth-provider';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/ui/empty-state';
import { PageLoader } from '@/components/ui/spinner';
import { adminApi } from '@/lib/api/admin';
import { APPLICATION_STATUS } from '@/lib/constants';
import { cn, formatDateTime, formatPhone } from '@/lib/utils';
import type { ApplicationStatus, DashboardOverview } from '@/types';

const STATUS_BAR_COLORS: Record<ApplicationStatus, string> = {
  NEW: 'bg-sky-500',
  CONTACTED: 'bg-amber-500',
  ENROLLED: 'bg-emerald-500',
  REJECTED: 'bg-red-500',
};

export default function DashboardPage() {
  const { admin } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'dashboard'], queryFn: adminApi.dashboard });

  if (isLoading || !data) return <PageLoader />;

  const { totals, applicationsByStatus } = data;

  const stats: { label: string; value: number; icon: LucideIcon; href: string; accent?: boolean }[] = [
    { label: 'Yangi arizalar', value: applicationsByStatus.NEW, icon: Inbox, href: '/admin/applications', accent: true },
    { label: 'Faol kurslar', value: totals.courses, icon: BookOpen, href: '/admin/courses' },
    { label: 'Mentorlar', value: totals.mentors, icon: Users, href: '/admin/mentors' },
    { label: 'Fikrlar', value: totals.testimonials, icon: MessageSquareQuote, href: '/admin/testimonials' },
  ];

  return (
    <>
      <PageHeader
        title={`Salom, ${admin.name.split(' ')[0]}! 👋`}
        description="Joylinks saytining umumiy holati"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Arizalar dinamikasi" subtitle="Oxirgi 14 kun">
          <ApplicationsChart data={data.applicationsChart} />
        </Panel>

        <Panel title="Arizalar holati" subtitle={`Jami: ${totals.applications} ta`}>
          <ul className="space-y-5">
            {(Object.keys(APPLICATION_STATUS) as ApplicationStatus[]).map((status) => {
              const count = applicationsByStatus[status];
              const percent = totals.applications ? Math.round((count / totals.applications) * 100) : 0;
              return (
                <li key={status}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">{APPLICATION_STATUS[status].label}</span>
                    <span className="text-slate-500">
                      <b className="text-slate-900">{count}</b> · {percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', STATUS_BAR_COLORS[status])}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <Panel
        className="mt-6"
        title="So'nggi arizalar"
        action={
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Barchasi
            <ArrowRight className="size-4" />
          </Link>
        }
      >
        {data.recentApplications.length === 0 ? (
          <EmptyState title="Hozircha arizalar yo'q" className="border-0 py-10" />
        ) : (
          <ul className="-mx-2 divide-y divide-slate-100">
            {data.recentApplications.map((application) => (
              <li key={application.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-2 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{application.fullName}</p>
                  <p className="text-sm text-slate-500">
                    {formatPhone(application.phone)} · {application.course?.title ?? 'Kurs tanlanmagan'}
                  </p>
                </div>
                <span className="text-sm text-slate-500">{formatDateTime(application.createdAt)}</span>
                <ApplicationStatusBadge status={application.status} />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-0.5',
        accent
          ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-glow'
          : 'border border-slate-200/80 bg-white shadow-soft',
      )}
    >
      {accent && <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />}
      <div className="relative flex items-start justify-between">
        <div>
          <p className={cn('text-sm font-semibold', accent ? 'text-brand-100' : 'text-slate-500')}>{label}</p>
          <p className={cn('mt-2 text-4xl font-extrabold', accent ? 'text-white' : 'text-slate-900')}>{value}</p>
        </div>
        <span
          className={cn(
            'flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110',
            accent ? 'bg-accent-400 text-ink-950' : 'bg-brand-50 text-brand-600',
          )}
        >
          <Icon className="size-6" />
        </span>
      </div>
    </Link>
  );
}

function Panel({
  title,
  subtitle,
  action,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft', className)}>
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

/** Kunlik arizalar soni — bitta seriyali ustunli grafik, hover'da qiymat ko'rsatiladi */
function ApplicationsChart({ data }: { data: DashboardOverview['applicationsChart'] }) {
  const max = Math.max(1, ...data.map((day) => day.count));
  const total = data.reduce((sum, day) => sum + day.count, 0);
  const label = (iso: string) => {
    const [, month, day] = iso.split('-');
    return `${day}.${month}`;
  };

  return (
    <figure>
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">{total}</span>
        <span className="text-sm text-slate-500">ta ariza 14 kunda</span>
      </div>

      <div className="relative h-52 border-b border-slate-200">
        {/* Yordamchi chiziqlar */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-dashed border-slate-100" />
          ))}
        </div>

        <ol className="relative flex h-full items-end gap-0.5">
          {data.map((day) => (
            <li key={day.date} className="group relative flex h-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-7 rounded-t-[4px] bg-brand-500 transition-colors group-hover:bg-brand-700"
                style={{ height: day.count ? `${(day.count / max) * 100}%` : '2px', opacity: day.count ? 1 : 0.35 }}
              />
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-center text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <b className="block text-sm">{day.count} ta</b>
                {label(day.date)}
              </div>
              <span className="sr-only">
                {label(day.date)}: {day.count} ta ariza
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div aria-hidden className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{label(data[0]?.date ?? '')}</span>
        <span>{label(data[Math.floor(data.length / 2)]?.date ?? '')}</span>
        <span>{label(data[data.length - 1]?.date ?? '')}</span>
      </div>
    </figure>
  );
}
