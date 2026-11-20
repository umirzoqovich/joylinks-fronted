'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Phone, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ApplicationStatusBadge } from '@/components/admin/application-status-badge';
import { MutedCell, PersonCell } from '@/components/admin/cells';
import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button, buttonStyles } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { adminApi } from '@/lib/api/admin';
import { APPLICATION_STATUS } from '@/lib/constants';
import { cn, formatDateTime, formatPhone } from '@/lib/utils';
import type { Application, ApplicationStatus } from '@/types';

const PAGE_SIZE = 15;
const STATUSES = Object.keys(APPLICATION_STATUS) as ApplicationStatus[];

export default function ApplicationsPage() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ApplicationStatus | undefined>();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState<Application | null>(null);

  const debouncedSearch = useDebouncedValue(search);
  const query = { status, search: debouncedSearch, page, limit: PAGE_SIZE };

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'applications', query],
    queryFn: () => adminApi.applications.list(query),
    placeholderData: keepPreviousData,
  });

  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin', 'applications'] }),
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }),
    ]);

  const update = useMutation({
    mutationFn: ({ id, ...body }: { id: string; status?: ApplicationStatus; note?: string | null }) =>
      adminApi.applications.update(id, body),
    onSuccess: (application) => {
      toast.success('Ariza yangilandi');
      setSelected((current) => (current?.id === application.id ? application : current));
      return invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => adminApi.applications.remove(id),
    onSuccess: () => {
      toast.success("Ariza o'chirildi");
      setDeleting(null);
      setSelected(null);
      return invalidate();
    },
    onError: (error) => toast.error(error.message),
  });

  const changeFilter = (next: ApplicationStatus | undefined) => {
    setStatus(next);
    setPage(1);
  };

  const meta = data?.meta;

  return (
    <>
      <PageHeader title="Arizalar" description="Saytdan kelgan so'rovlar va ularning holati" />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1">
          <FilterTab active={!status} onClick={() => changeFilter(undefined)}>
            Barchasi
          </FilterTab>
          {STATUSES.map((value) => (
            <FilterTab key={value} active={status === value} onClick={() => changeFilter(value)}>
              {APPLICATION_STATUS[value].label}
            </FilterTab>
          ))}
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Ism yoki telefon..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="bg-white pl-11"
          />
        </div>
      </div>

      <DataTable
        rows={data?.items ?? []}
        rowKey={(row) => row.id}
        loading={isLoading}
        emptyTitle="Arizalar topilmadi"
        onRowClick={setSelected}
        columns={[
          {
            key: 'name',
            header: 'Mijoz',
            cell: (row) => <PersonCell name={row.fullName} subtitle={formatPhone(row.phone)} />,
          },
          {
            key: 'course',
            header: 'Kurs',
            cell: (row) => <MutedCell>{row.course?.title ?? '—'}</MutedCell>,
          },
          {
            key: 'date',
            header: 'Sana',
            cell: (row) => <MutedCell>{formatDateTime(row.createdAt)}</MutedCell>,
          },
          {
            key: 'status',
            header: 'Holat',
            cell: (row) => <ApplicationStatusBadge status={row.status} />,
          },
          {
            key: 'actions',
            header: '',
            className: 'w-24 text-right',
            cell: (row) => (
              <div className="flex justify-end gap-1" onClick={(event) => event.stopPropagation()}>
                <a
                  href={`tel:${row.phone}`}
                  aria-label="Qo'ng'iroq qilish"
                  className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <Phone className="size-4" />
                </a>
                <button
                  type="button"
                  aria-label="O'chirish"
                  onClick={() => setDeleting(row)}
                  className="flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ),
          },
        ]}
      />

      {meta && meta.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
          <span>
            Jami: <b className="text-slate-900">{meta.total}</b> ta ariza
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Oldingi" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </Button>
            <span className="px-2 font-semibold text-slate-700">
              {meta.page} / {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Keyingi"
              disabled={page >= meta.totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}

      <Drawer open={selected !== null} onClose={() => setSelected(null)} title="Ariza tafsilotlari">
        {selected && (
          <ApplicationDetails
            key={selected.id}
            application={selected}
            saving={update.isPending}
            onStatusChange={(next) => update.mutate({ id: selected.id, status: next })}
            onSaveNote={(note) => update.mutate({ id: selected.id, note: note || null })}
            onDelete={() => setDeleting(selected)}
          />
        )}
      </Drawer>

      <ConfirmDialog
        open={deleting !== null}
        title="Arizani o'chirasizmi?"
        description={deleting ? `${deleting.fullName} — ${formatPhone(deleting.phone)}` : undefined}
        loading={remove.isPending}
        onConfirm={() => deleting && remove.mutate(deleting.id)}
        onClose={() => setDeleting(null)}
      />
    </>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl px-4 py-2 text-sm font-semibold whitespace-nowrap transition',
        active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900',
      )}
    >
      {children}
    </button>
  );
}

interface ApplicationDetailsProps {
  application: Application;
  saving: boolean;
  onStatusChange: (status: ApplicationStatus) => void;
  onSaveNote: (note: string) => void;
  onDelete: () => void;
}

function ApplicationDetails({ application, saving, onStatusChange, onSaveNote, onDelete }: ApplicationDetailsProps) {
  const [note, setNote] = useState(application.note ?? '');

  const details = [
    { label: 'Telefon', value: formatPhone(application.phone) },
    { label: 'Kurs', value: application.course?.title ?? 'Tanlanmagan' },
    { label: 'Yuborilgan', value: formatDateTime(application.createdAt) },
  ];

  return (
    <div className="space-y-8 px-6 py-6 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <PersonCell name={application.fullName} subtitle={formatPhone(application.phone)} />
        <ApplicationStatusBadge status={application.status} />
      </div>

      <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
        {details.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-slate-500">{label}</dt>
            <dd className="text-right font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
        {application.message && (
          <div className="px-4 py-3 text-sm">
            <dt className="mb-1 text-slate-500">Xabar</dt>
            <dd className="text-slate-800">{application.message}</dd>
          </div>
        )}
      </dl>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-700">Holatni o&apos;zgartirish</p>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map((value) => (
            <button
              key={value}
              type="button"
              disabled={saving}
              onClick={() => onStatusChange(value)}
              className={cn(
                'rounded-xl border px-3 py-2.5 text-sm font-semibold transition disabled:opacity-60',
                application.status === value
                  ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/15'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300',
              )}
            >
              {APPLICATION_STATUS[value].label}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Ichki izoh" htmlFor="note" hint="Faqat adminlar ko'radi">
        <Textarea id="note" rows={4} value={note} onChange={(event) => setNote(event.target.value)} />
      </FormField>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => onSaveNote(note)} loading={saving} disabled={note === (application.note ?? '')}>
          Izohni saqlash
        </Button>
        <a href={`tel:${application.phone}`} className={buttonStyles({ variant: 'outline' })}>
          <Phone />
          Qo&apos;ng&apos;iroq
        </a>
        <Button variant="ghost" className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700" onClick={onDelete}>
          <Trash2 />
          O&apos;chirish
        </Button>
      </div>
    </div>
  );
}
