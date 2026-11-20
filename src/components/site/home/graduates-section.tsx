import { Play } from 'lucide-react';
import Image from 'next/image';

import { INSTAGRAM_URL } from '@/lib/constants';
import { mediaUrl } from '@/lib/utils';
import type { Testimonial } from '@/types';

import { VideoCarousel } from './video-carousel';

const PLACEHOLDER_COUNT = 4;

/** Faqat http(s) havolalari ruxsat etiladi */
function safeVideoUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : null;
  } catch {
    return null;
  }
}

const CARD_CLASS =
  'relative flex aspect-[9/16] w-64 shrink-0 snap-start items-center justify-center overflow-hidden rounded-3xl bg-slate-100 shadow-soft sm:w-72';

/** O'quvchilarimiz natijalari — video galereya */
export function GraduatesSection({
  testimonials,
  instagramUrl = INSTAGRAM_URL,
}: {
  testimonials: Testimonial[];
  instagramUrl?: string | null;
}) {
  const link = safeVideoUrl(instagramUrl) ?? INSTAGRAM_URL;
  const videos = testimonials.filter((t) => safeVideoUrl(t.videoUrl));

  return (
    <section id="graduates" className="scroll-mt-24 bg-white py-12 sm:py-20 lg:py-28">
      <VideoCarousel title="O'quvchilarimiz natijalari">
        {videos.length > 0
          ? videos.map((item) => <VideoCard key={item.id} item={item} href={link} />)
          : Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
              <li key={index} className={CARD_CLASS}>
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-300 to-transparent" />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram sahifamizda videolarni ko'rish"
                  className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-600"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-110">
                    <Play className="ml-0.5 size-6 fill-current" />
                  </span>
                </a>
                <span className="absolute bottom-5 text-sm font-semibold text-slate-500">
                  Instagramda ko&apos;rish
                </span>
              </li>
            ))}
      </VideoCarousel>
    </section>
  );
}

function VideoCard({ item, href }: { item: Testimonial; href: string }) {
  const photo = mediaUrl(item.photo);

  return (
    <li className={CARD_CLASS}>
      {photo && <Image src={photo} alt="" fill unoptimized className="object-cover" />}
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/80 to-transparent" />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.fullName} — video hikoyani ko'rish`}
        className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-600"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-110">
          <Play className="ml-0.5 size-6 fill-current" />
        </span>
      </a>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="font-bold">{item.fullName}</p>
        <p className="text-sm text-white/80">{item.courseName}</p>
      </div>
    </li>
  );
}
