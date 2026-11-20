'use client';

import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { Spinner } from '@/components/ui/spinner';
import { adminApi } from '@/lib/api/admin';
import { cn, mediaUrl } from '@/lib/utils';

const MAX_SIZE_MB = 5;

interface ImageUploadProps {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  /** Ko'rinish nisbati: avatar uchun kvadrat, muqova uchun keng */
  aspect?: 'square' | 'wide';
}

export function ImageUpload({ value, onChange, aspect = 'wide' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const preview = mediaUrl(value);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Fayl hajmi ${MAX_SIZE_MB} MB dan oshmasligi kerak`);
      return;
    }

    setUploading(true);
    try {
      const { url } = await adminApi.upload(file);
      onChange(url);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-brand-300',
        aspect === 'square' ? 'aspect-square w-40' : 'aspect-[16/9] w-full',
      )}
    >
      {preview ? (
        <>
          <Image src={preview} alt="Yuklangan rasm" fill unoptimized className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink-950/50 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900"
            >
              Almashtirish
            </button>
            <button
              type="button"
              aria-label="Rasmni o'chirish"
              onClick={() => onChange(null)}
              className="flex size-9 items-center justify-center rounded-xl bg-red-600 text-white"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-slate-500"
        >
          <ImagePlus className="size-7 text-brand-500" />
          <span className="text-sm font-semibold">Rasm yuklash</span>
          <span className="text-xs text-slate-400">PNG, JPG, WEBP · {MAX_SIZE_MB} MB gacha</span>
        </button>
      )}

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-brand-600">
          <Spinner className="size-7" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  );
}
