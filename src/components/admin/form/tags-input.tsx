'use client';

import { X } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

import { fieldStyles } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  id?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

/** Enter yoki vergul bosilganda teg qo'shiladi; Backspace oxirgisini o'chiradi */
export function TagsInput({ id, value, onChange, placeholder = "Yozing va Enter bosing" }: TagsInputProps) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const tag = draft.trim().replace(/,$/, '');
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag();
    } else if (event.key === 'Backspace' && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        fieldStyles,
        'flex min-h-11 flex-wrap items-center gap-1.5 px-2 py-1.5',
        'focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15',
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-lg bg-brand-50 py-1 pr-1 pl-2.5 text-sm font-semibold text-brand-700"
        >
          {tag}
          <button
            type="button"
            aria-label={`${tag} ni o'chirish`}
            onClick={() => onChange(value.filter((item) => item !== tag))}
            className="flex size-5 items-center justify-center rounded-md hover:bg-brand-100"
          >
            <X className="size-3.5" />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ''}
        className="min-w-32 flex-1 bg-transparent px-2 py-1 text-[15px] outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
