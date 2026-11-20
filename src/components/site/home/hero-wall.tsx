import Image from 'next/image';

import { CourseIcon } from '@/components/ui/course-icon';
import { getGalleryPhotos } from '@/lib/gallery';
import { cn, mediaUrl } from '@/lib/utils';
import type { CourseSummary, Mentor, Testimonial } from '@/types';

interface HeroWallProps {
  courses: CourseSummary[];
  mentors?: Mentor[];
  testimonials?: Testimonial[];
}

const COLUMNS = 9;
const ROWS = 4;
/** Ustun nusxalari soni: ko'rinadigan oyna hech qachon rasmlardan chiqib ketmasligi uchun */
const COPIES = 6;
const LOOP_SHIFT = `${(100 / COPIES).toFixed(4)}%`;
const FOCUS_POINTS = ['20% 30%', '75% 40%', '50% 70%', '30% 60%', '85% 25%', '10% 80%', '60% 50%'];
const PLACEHOLDER_TONES = ['bg-brand-800', 'bg-ink-800', 'bg-brand-900'];

interface Slot {
  src: string | null;
  focus: string;
  icon: string;
  tone: string;
}

/** Yon-yon tushuvchi, aylantirilgan rasmlar devori — faqat bezak */
export function HeroWall({ courses, mentors = [], testimonials = [] }: HeroWallProps) {
  const galleryPhotos = getGalleryPhotos();
  const photos = Array.from(
    new Set([
      ...galleryPhotos,
      ...[...mentors.map((m) => m.photo), ...testimonials.map((t) => t.photo), ...courses.map((c) => c.image)]
        .map((p) => mediaUrl(p))
        .filter((p): p is string => Boolean(p)),
    ]),
  );

  const slots: Slot[] = Array.from({ length: COLUMNS * ROWS }, (_, i) => ({
    src: photos.length > 0 ? photos[i % photos.length] : null,
    focus: FOCUS_POINTS[i % FOCUS_POINTS.length],
    icon: courses.length ? courses[i % courses.length].icon : 'code',
    tone: PLACEHOLDER_TONES[i % PLACEHOLDER_TONES.length],
  }));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink-950">
      <style>{`
        @keyframes jl-wall-up { from { transform: translateY(0); } to { transform: translateY(-${LOOP_SHIFT}); } }
        @keyframes jl-wall-down { from { transform: translateY(-${LOOP_SHIFT}); } to { transform: translateY(0); } }
        /* Telefonda: aylantirmasdan, butun hero bo'ylab 3 ustun; kattaroq ekranda: qiya 3D devor */
        .jl-wall-plane { width: 112vw; transform: none; }
        @media (min-width: 640px) {
          .jl-wall-plane { width: 250vw; transform: rotateX(58deg) rotateZ(-30deg); }
        }
        .jl-wall-col-a { animation: jl-wall-up 60s linear infinite; }
        .jl-wall-col-b { animation: jl-wall-down 60s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .jl-wall-col-a, .jl-wall-col-b { animation: none; }
        }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center [perspective:1600px]">
        <div
          className="jl-wall-plane grid max-w-[5200px] shrink-0 grid-cols-3 gap-3 opacity-45 sm:grid-cols-9 sm:gap-4 sm:opacity-40 lg:gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: COLUMNS }, (_, col) => (
            <div key={col} className={cn(
                'flex-col gap-3 sm:flex sm:gap-4 lg:gap-6',
                col >= 3 ? 'hidden' : 'flex',
                col % 2 ? 'jl-wall-col-b' : 'jl-wall-col-a',
              )}>
              {Array.from({ length: COPIES }, (_, copy) =>
                slots
                  .filter((_, i) => i % COLUMNS === col)
                  .map((slot, row) => (
                    <div
                      key={`${copy}-${row}`}
                      className={cn('relative aspect-[3/4] overflow-hidden rounded-2xl sm:aspect-[4/3]', slot.tone)}
                    >
                      {slot.src ? (
                        <Image
                          src={slot.src}
                          alt=""
                          fill
                          sizes="20vw"
                          unoptimized
                          className="object-cover"
                          style={{ objectPosition: slot.focus }}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-white/30">
                          <CourseIcon name={slot.icon} className="size-10" />
                        </div>
                      )}
                    </div>
                  )),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(15_24_38/0.55),rgb(15_24_38/0.95))]" />
    </div>
  );
}
