import { ExternalLink } from 'lucide-react';

import type { Branch } from '@/types';

export function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="flex h-full flex-col border-t border-slate-200 pt-6">
      <h3 className="text-lg font-semibold text-ink-950">{branch.name}</h3>

      <dl className="mt-4 space-y-2 text-[15px] text-slate-600">
        <div>
          <dt className="sr-only">Manzil</dt>
          <dd>{branch.address}</dd>
        </div>
        {branch.landmark && (
          <div>
            <dt className="sr-only">Mo&apos;ljal</dt>
            <dd>{branch.landmark}</dd>
          </div>
        )}
        <div>
          <dt className="sr-only">Ish vaqti</dt>
          <dd>{branch.workingHours}</dd>
        </div>
        {branch.phone && (
          <div>
            <dt className="sr-only">Telefon</dt>
            <dd>
              <a
                href={`tel:${branch.phone.replace(/\s/g, '')}`}
                className="font-medium text-ink-950 hover:text-brand-700"
              >
                {branch.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      {branch.mapUrl && (
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          Xaritada ko&apos;rish
          <ExternalLink className="size-4" />
        </a>
      )}
    </article>
  );
}
