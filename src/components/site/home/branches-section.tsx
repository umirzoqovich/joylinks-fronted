import { Container } from '@/components/ui/container';
import type { Branch } from '@/types';

import { Reveal } from '../reveal';
import { BranchTabs } from './branch-tabs';

export function BranchesSection({ branches }: { branches: Branch[] }) {
  if (branches.length === 0) return null;

  return (
    <section id="branches" className="scroll-mt-24 border-t border-slate-200 bg-white py-14 sm:py-24 lg:py-32">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink-950 sm:text-4xl lg:text-5xl">
            Sizga yaqin filialni tanlang
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Manzil, ish vaqti va telefon raqamini ko&apos;ring.
          </p>
        </Reveal>
        <BranchTabs branches={branches} />
      </Container>
    </section>
  );
}
