import { Facebook, Instagram, Send, Youtube, type LucideIcon } from 'lucide-react';

import type { SiteSettings } from '@/types';
import { cn } from '@/lib/utils';

const SOCIALS: { key: keyof SiteSettings; label: string; icon: LucideIcon }[] = [
  { key: 'telegram', label: 'Telegram', icon: Send },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
];

interface SocialLinksProps {
  settings: SiteSettings;
  className?: string;
}

export function SocialLinks({ settings, className }: SocialLinksProps) {
  const links = SOCIALS.filter(({ key }) => Boolean(settings[key]));
  if (links.length === 0) return null;

  return (
    <div className={cn('flex gap-2', className)}>
      {links.map(({ key, label, icon: Icon }) => (
        <a
          key={key}
          href={String(settings[key])}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 backdrop-blur-md shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] transition hover:bg-white/15 hover:text-white"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
