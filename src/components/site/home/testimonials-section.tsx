import { Container } from '@/components/ui/container';
import type { Testimonial } from '@/types';

import { Reveal } from '../reveal';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-mt-24 border-t border-slate-200 bg-white py-14 sm:py-24 lg:py-32">
      <Container>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-ink-950 sm:text-5xl">
          Ular o&apos;z yo&apos;lini topdi
        </h2>

        <ul className="mt-8 sm:mt-14 grid gap-x-16 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.id} className="border-t border-slate-200 py-10">
              <Reveal delay={(index % 2) * 0.06}>
                <TestimonialItem testimonial={testimonial} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  const role = [testimonial.position, testimonial.workplace].filter(Boolean).join(', ');

  return (
    <figure>
      <blockquote className="text-xl leading-snug font-medium tracking-tight text-ink-950 sm:text-2xl">
        “{testimonial.text}”
      </blockquote>
      <figcaption className="mt-6 text-sm text-slate-600">
        <p className="font-semibold text-ink-950">{testimonial.fullName}</p>
        <p>{testimonial.courseName}</p>
        {role && <p>{role}</p>}
        {testimonial.videoUrl && (
          <a
            href={testimonial.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-medium text-ink-950 underline underline-offset-4 hover:text-brand-700"
          >
            Videoni ko&apos;rish
          </a>
        )}
      </figcaption>
    </figure>
  );
}
