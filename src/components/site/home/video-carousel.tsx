'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, type ReactNode } from 'react';

/** Gorizontal siljitiladigan karusel: chap/o'ng tugmalar bilan */
export function VideoCarousel({ title, children }: { title: ReactNode; children: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tighter text-balance text-ink-950 uppercase sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Oldingisi"
            onClick={() => scrollByPage(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-ink-950 transition-colors hover:border-brand-600 hover:text-brand-600"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Keyingisi"
            onClick={() => scrollByPage(1)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-ink-950 transition-colors hover:border-brand-600 hover:text-brand-600"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {children}
      </ul>
    </div>
  );
}
