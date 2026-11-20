'use client';

import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/drawer';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "O'chirish",
  loading,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <span className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <TriangleAlert className="size-6" />
      </span>
      <h2 className="mt-5 text-xl font-extrabold text-slate-900">{title}</h2>
      {description && <p className="mt-2 text-slate-500">{description}</p>}
      <div className="mt-8 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
          Bekor qilish
        </Button>
        <Button variant="danger" className="flex-1" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
