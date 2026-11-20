import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

/** Jadvallarda qayta ishlatiladigan katakchalar */

export function VisibilityBadge({ visible }: { visible: boolean }) {
  return visible ? (
    <Badge tone="green" dot>
      Faol
    </Badge>
  ) : (
    <Badge tone="slate" dot>
      Yashirin
    </Badge>
  );
}

export function PersonCell({ name, subtitle, photo }: { name: string; subtitle?: string | null; photo?: string | null }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={name} src={photo} className="size-10 text-xs" />
      <div className="min-w-0">
        <p className="truncate font-bold text-slate-900">{name}</p>
        {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

export function TextCell({ title, subtitle }: { title: string; subtitle?: string | null }) {
  return (
    <div className="max-w-md">
      <p className="line-clamp-1 font-bold text-slate-900">{title}</p>
      {subtitle && <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function MutedCell({ children }: { children: React.ReactNode }) {
  return <span className="whitespace-nowrap text-slate-600">{children}</span>;
}
