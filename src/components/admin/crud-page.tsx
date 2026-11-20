'use client';

import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { PageLoader } from '@/components/ui/spinner';
import { useResource, useResourceDetails } from '@/hooks/use-resource';
import type { AdminResource } from '@/lib/api/admin';

import { ConfirmDialog } from './confirm-dialog';
import { DataTable, type Column } from './data-table';
import { PageHeader } from './page-header';

/** Har bir resurs formasi qabul qiladigan umumiy props */
export interface ResourceFormProps<TData> {
  initialData?: TData;
  onSubmit: (values: unknown) => Promise<unknown>;
  onCancel: () => void;
}

type EditorState = { mode: 'create' } | { mode: 'edit'; id: string } | null;

interface CrudPageProps<TItem extends { id: string }, TDetails> {
  resource: AdminResource;
  title: string;
  description?: string;
  /** Birlik nomi: "kurs", "mentor" */
  entityName: string;
  columns: Column<TItem>[];
  /** Qidiruv qaysi matn bo'yicha ishlashi */
  searchText?: (item: TItem) => string;
  /** Ro'yxatda kelmaydigan maydonlar bo'lsa — tahrirlashda to'liq yozuv yuklanadi */
  fetchDetails?: boolean;
  drawerSize?: 'md' | 'lg';
  renderForm: (props: ResourceFormProps<TDetails>) => ReactNode;
}

/**
 * Universal CRUD sahifasi: jadval, qidiruv, qo'shish/tahrirlash paneli va o'chirish tasdig'i.
 * Har bir resurs faqat ustunlar va formani beradi.
 */
export function CrudPage<TItem extends { id: string }, TDetails = TItem>({
  resource,
  title,
  description,
  entityName,
  columns,
  searchText,
  fetchDetails,
  drawerSize,
  renderForm,
}: CrudPageProps<TItem, TDetails>) {
  const { list, create, update, remove } = useResource<TItem>(resource);
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState<EditorState>(null);
  const [deleting, setDeleting] = useState<TItem | null>(null);

  const editingId = editor?.mode === 'edit' ? editor.id : null;
  const details = useResourceDetails<TDetails>(resource, editingId, Boolean(fetchDetails));

  const rows = useMemo(() => {
    const items = list.data ?? [];
    const query = search.trim().toLowerCase();
    if (!query || !searchText) return items;
    return items.filter((item) => searchText(item).toLowerCase().includes(query));
  }, [list.data, search, searchText]);

  const closeEditor = () => setEditor(null);

  // Xatolar `useResource` ichida toast orqali ko'rsatiladi — bu yerda faqat panel yopilmaydi
  const handleSubmit = async (values: unknown) => {
    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, body: values });
      } else {
        await create.mutateAsync(values);
      }
      closeEditor();
    } catch {
      /* panel ochiq qoladi, foydalanuvchi xatoni tuzatadi */
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await remove.mutateAsync(deleting.id);
      setDeleting(null);
    } catch {
      /* toast orqali ko'rsatildi */
    }
  };

  const editingData = editingId
    ? fetchDetails
      ? details.data
      : (list.data?.find((item) => item.id === editingId) as TDetails | undefined)
    : undefined;

  const tableColumns: Column<TItem>[] = [
    ...columns,
    {
      key: 'actions',
      header: '',
      className: 'w-24 text-right',
      cell: (row) => (
        <div className="flex justify-end gap-1" onClick={(event) => event.stopPropagation()}>
          <IconButton label="Tahrirlash" onClick={() => setEditor({ mode: 'edit', id: row.id })}>
            <Pencil />
          </IconButton>
          <IconButton label="O'chirish" danger onClick={() => setDeleting(row)}>
            <Trash2 />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button onClick={() => setEditor({ mode: 'create' })}>
            <Plus />
            Yangi {entityName}
          </Button>
        }
      />

      {searchText && (
        <div className="relative mb-5 max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Qidirish..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-white pl-11"
          />
        </div>
      )}

      <DataTable
        columns={tableColumns}
        rows={rows}
        rowKey={(row) => row.id}
        loading={list.isLoading}
        emptyTitle={search ? 'Hech narsa topilmadi' : `Hozircha ${entityName} yo'q`}
        emptyDescription={search ? undefined : `"Yangi ${entityName}" tugmasi orqali qo'shing.`}
        onRowClick={(row) => setEditor({ mode: 'edit', id: row.id })}
      />

      <Drawer
        open={editor !== null}
        onClose={closeEditor}
        size={drawerSize}
        title={editingId ? `${capitalize(entityName)}ni tahrirlash` : `Yangi ${entityName}`}
      >
        {editingId && !editingData ? (
          <PageLoader />
        ) : (
          renderForm({ initialData: editingData, onSubmit: handleSubmit, onCancel: closeEditor })
        )}
      </Drawer>

      <ConfirmDialog
        open={deleting !== null}
        title={`${capitalize(entityName)}ni o'chirasizmi?`}
        description="Bu amalni ortga qaytarib bo'lmaydi."
        loading={remove.isPending}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </>
  );
}

function IconButton({
  label,
  danger,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={
        danger
          ? 'flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 [&_svg]:size-4'
          : 'flex size-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-brand-50 hover:text-brand-600 [&_svg]:size-4'
      }
    >
      {children}
    </button>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
