'use client';

import { Minus, Plus } from 'lucide-react';
import { useId, useState } from 'react';

import { cn } from '@/lib/utils';
import type { Faq } from '@/types';

export function FaqAccordion({ faqs }: { faqs: Pick<Faq, 'id' | 'question' | 'answer'>[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="border-t border-slate-200">
      {faqs.map((faq) => (
        <FaqItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          open={openId === faq.id}
          onToggle={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
        />
      ))}
    </div>
  );
}

interface FaqItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  const panelId = useId();
  const Icon = open ? Minus : Plus;

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 rounded-lg py-5 text-left transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <span className="text-base font-medium text-ink-950 sm:text-lg">{question}</span>
        <Icon aria-hidden className="size-4 shrink-0 text-slate-600" />
      </button>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 leading-relaxed text-slate-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}
