import type { ReactNode } from 'react';

import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading,
  emptyTitle = "Ma'lumot topilmadi",
  emptyDescription,
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-200/80 bg-white text-brand-600">
        <Spinner className="size-7" />
      </div>
    );
  }

  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className="bg-white" />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-5 py-3.5 text-xs font-bold tracking-wider whitespace-nowrap text-slate-500 uppercase',
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'transition-colors hover:bg-slate-50/80',
                  onRowClick && 'cursor-pointer',
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn('px-5 py-4 align-middle', column.className)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
