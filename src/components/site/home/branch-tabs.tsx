'use client';

import { ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState, type KeyboardEvent } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { cn, mediaUrl } from '@/lib/utils';
import type { Branch } from '@/types';

export function BranchTabs({ branches }: { branches: Branch[] }) {
  const [activeId, setActiveId] = useState(branches[0]?.id);
  const branch = branches.find((item) => item.id === activeId) ?? branches[0];
  if (!branch) return null;

  const image = mediaUrl(branch.image);
  const panelId = 'branch-panel';

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    const index = branches.findIndex((item) => item.id === currentId);
    const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next = index;
    if (event.key in offsets) next = (index + offsets[event.key] + branches.length) % branches.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = branches.length - 1;
    else return;
    event.preventDefault();
    setActiveId(branches[next].id);
    document.getElementById(`branch-tab-${branches[next].id}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filiallar"
        className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {branches.map((item) => {
          const active = item.id === branch.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`branch-tab-${item.id}`}
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2 text-[15px] font-medium whitespace-nowrap backdrop-blur-md transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700',
                active
                  ? 'border-transparent bg-brand-700 text-white'
                  : 'border-slate-300/70 bg-white/50 text-slate-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] hover:bg-white/80 hover:text-ink-950',
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`branch-tab-${branch.id}`}
        tabIndex={0}
        className="grid gap-10 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 lg:grid-cols-2 lg:gap-16"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
          {image ? (
            <Image src={image} alt="" fill unoptimized className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <MapPin className="size-12" />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink-950">{branch.name}</h3>
          <dl className="mt-6 border-t border-slate-200 text-[15px]">
            <Row label="Manzil">{branch.address}</Row>
            {branch.landmark && <Row label="Mo'ljal">{branch.landmark}</Row>}
            <Row label="Ish vaqti">{branch.workingHours}</Row>
            {branch.phone && (
              <Row label="Telefon">
                <a
                  href={`tel:${branch.phone.replace(/\s/g, '')}`}
                  className="font-medium text-ink-950 hover:text-brand-700"
                >
                  {branch.phone}
                </a>
              </Row>
            )}
          </dl>

          {branch.mapUrl && (
            <ButtonLink
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="mt-8"
            >
              Xaritada ko&apos;rish
              <ExternalLink />
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-slate-200 py-4">
      <dt className="text-slate-600">{label}</dt>
      <dd className="text-ink-950">{children}</dd>
    </div>
  );
}
