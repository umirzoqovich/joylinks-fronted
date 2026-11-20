'use client';

import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: 'md' | 'lg';
  children: ReactNode;
}

/** O'ng tomondan chiqadigan panel (admin formalari uchun) */
export function Drawer({ open, onClose, title, description, size = 'md', children }: DrawerProps) {
  useLockBodyScroll(open);
  useEscape(open, onClose);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={cn('fixed inset-0 z-[60]', open ? 'visible' : 'invisible')} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out',
          size === 'lg' ? 'max-w-3xl' : 'max-w-xl',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{open && children}</div>
      </section>
    </div>,
    document.body,
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/** Markazdagi kichik oyna */
export function Modal({ open, onClose, children, className }: ModalProps) {
  useLockBodyScroll(open);
  useEscape(open, onClose);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        className={cn('relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8', className)}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => event.key === 'Escape' && onEscape();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onEscape]);
}
