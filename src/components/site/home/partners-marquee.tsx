import { Building2 } from 'lucide-react';
import Image from 'next/image';

import { cn, mediaUrl } from '@/lib/utils';
import type { Partner } from '@/types';

const ROWS = 3;
/** Hamkor yo'q bo'lganda har qatordagi bo'sh joy soni */
const PLACEHOLDERS_PER_ROW = 8;
/** Bir qatorda kamida shuncha element bo'lishi kerak, aks holda lenta bo'shab qoladi */
const MIN_ITEMS_PER_ROW = 8;
const ROW_DURATIONS = ['55s', '70s', '62s'];

type Item = { key: string; partner: Partner | null };

function buildRows(partners: Partner[]): Item[][] {
  const rows: Item[][] = Array.from({ length: ROWS }, () => []);
  if (partners.length === 0) {
    return rows.map((_, r) =>
      Array.from({ length: PLACEHOLDERS_PER_ROW }, (_, i) => ({ key: `ph-${r}-${i}`, partner: null })),
    );
  }
  partners.forEach((partner, index) => rows[index % ROWS].push({ key: partner.id, partner }));
  return rows.map((row, r) => {
    if (row.length === 0) return row;
    const filled: Item[] = [];
    while (filled.length < MIN_ITEMS_PER_ROW) {
      filled.push(...row.map((item) => ({ ...item, key: `${item.key}-${r}-${filled.length}` })));
    }
    return filled;
  });
}

/** Bitiruvchilarimiz ish joylari: uch qatorli, qarama-qarshi yo'nalishda aylanuvchi lenta */
export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const rows = buildRows(partners).filter((row) => row.length > 0);

  return (
    <section data-header-theme="dark" className="bg-ink-950 py-12 sm:py-20 lg:py-28">
      <h2 className="px-4 text-center text-3xl font-extrabold tracking-tighter text-balance text-white uppercase sm:text-4xl lg:text-5xl">
        Bitiruvchilarimiz ish joylari
      </h2>

      <div className="mt-12 space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="mask-fade-x overflow-hidden motion-reduce:[mask-image:none]"
            aria-hidden={partners.length === 0 || undefined}
          >
            <ul
              className={cn(
                'animate-marquee flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6',
              )}
              style={{
                animationDuration: ROW_DURATIONS[rowIndex % ROW_DURATIONS.length],
                animationDirection: rowIndex % 2 === 1 ? 'reverse' : 'normal',
              }}
            >
              {[...row, ...row].map((item, index) => (
                <li key={`${item.key}-${index}`} aria-hidden={index >= row.length || undefined}>
                  <Chip partner={item.partner} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Chip({ partner }: { partner: Partner | null }) {
  const logo = partner ? mediaUrl(partner.logo) : null;

  return (
    <div className="flex h-24 w-60 items-center justify-center gap-3 rounded-2xl bg-white px-5">
      {partner && logo ? (
        <>
          <Image
            src={logo}
            alt=""
            width={48}
            height={48}
            unoptimized
            className="size-12 shrink-0 rounded-lg object-contain"
          />
          <span className="truncate text-lg font-bold tracking-tight text-ink-950">{partner.name}</span>
        </>
      ) : partner ? (
        <span className="text-center text-lg font-bold tracking-tight text-ink-950">{partner.name}</span>
      ) : (
        <Building2 className="size-8 text-slate-300" aria-hidden />
      )}
    </div>
  );
}
