import { Container } from '@/components/ui/container';

import { Reveal } from '../reveal';

const EXTRAS = [
  { title: 'Kovorking', description: '24/7 ochiq kovorking va bepul wifi.' },
  { title: 'Master-klasslar', description: 'Har hafta soha mutaxassislari bilan master-klasslar.' },
  { title: 'Geymifikatsiya', description: 'O‘rganishni qiziqarli qiladigan ball va reyting tizimi.' },
  { title: 'Musobaqa va viktorinalar', description: 'Bilimingizni sinab ko‘ring va sovrinlar yuting.' },
  { title: 'Qo‘shimcha mukofot', description: 'Ishga joylashgan bitiruvchilar uchun alohida rag‘bat.' },
  { title: 'Ishga tayyorlov', description: 'Sertifikat va HR suhbatiga puxta tayyorgarlik.' },
];

export function ExtrasSection() {
  return (
    <section data-header-theme="dark" className="bg-ink-950 py-14 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Bizda nafaqat kurslar, balki…
          </h2>
        </Reveal>

        <ul className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRAS.map((item, index) => (
            <li
              key={item.title}
              className="border-b border-white/10 py-8 sm:px-6 sm:odd:pl-0 lg:px-8 lg:pl-8 lg:first:pl-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0"
            >
              <Reveal delay={index * 0.05}>
                <p className="text-sm font-medium tabular-nums text-brand-400" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
