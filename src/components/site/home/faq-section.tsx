import { Container } from '@/components/ui/container';
import type { Faq } from '@/types';

import { FaqAccordion } from '../faq-accordion';
import { Reveal } from '../reveal';

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 border-t border-slate-200 bg-white py-14 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink-950 sm:text-4xl">
            Ko&apos;p beriladigan savollar
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-slate-600">
            Javob topa olmadingizmi? Ariza qoldiring, menejerimiz barcha savollaringizga javob beradi.
          </p>
        </Reveal>
        <FaqAccordion faqs={faqs} />
      </Container>
    </section>
  );
}
