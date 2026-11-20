import Image from 'next/image';

import { cn, initials, mediaUrl } from '@/lib/utils';

const GRADIENTS = [
  'from-brand-500 to-brand-700',
  'from-brand-400 to-emerald-600',
  'from-emerald-500 to-emerald-600',
  'from-lime-500 to-brand-600',
  'from-emerald-500 to-brand-700',
  'from-brand-600 to-brand-900',
];

/** Ism bo'yicha doimiy gradient tanlaydi */
function gradientFor(name: string) {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return GRADIENTS[hash % GRADIENTS.length];
}

interface AvatarProps {
  name: string;
  src?: string | null;
  className?: string;
}

/** Rasm bo'lmasa, ism bosh harflari gradient fonda ko'rsatiladi */
export function Avatar({ name, src, className }: AvatarProps) {
  const url = mediaUrl(src);

  return (
    <div
      className={cn(
        'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br font-bold text-white',
        gradientFor(name),
        className,
      )}
    >
      {url ? (
        <Image src={url} alt={name} fill unoptimized className="object-cover" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </div>
  );
}
