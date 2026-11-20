import Image from 'next/image';

import { initials, mediaUrl } from '@/lib/utils';
import type { Mentor } from '@/types';

type MentorCardProps = { mentor: Mentor & { courses?: { title: string; slug: string }[] } };

const MAX_BADGES = 2;

/** To'q fonli, oq-qora rasmli ustoz kartasi: ko'nikmalar belgilar ko'rinishida */
export function MentorCard({ mentor }: MentorCardProps) {
  const photo = mediaUrl(mentor.photo);
  const badges = mentor.skills.slice(0, MAX_BADGES);

  return (
    <article className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 bg-ink-800">
      {photo ? (
        <Image
          src={photo}
          alt={mentor.fullName}
          fill
          unoptimized
          className="object-cover object-top grayscale transition duration-500 hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full items-center justify-center" aria-hidden>
          <span className="text-6xl font-semibold text-slate-500">{initials(mentor.fullName)}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent p-5 pt-24">
        {badges.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-1.5">
            {badges.map((badge, index) => (
              <li
                key={badge}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${index === 0 ? 'bg-brand-500 text-ink-950' : 'bg-white text-ink-950'}`}
              >
                {badge}
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-xl font-bold text-white">{mentor.fullName}</h3>
        <p className="mt-0.5 text-sm text-slate-300">{mentor.position}</p>
      </div>
    </article>
  );
}
