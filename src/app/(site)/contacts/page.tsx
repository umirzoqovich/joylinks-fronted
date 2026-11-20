import type { Metadata } from 'next';

import { ApplicationForm } from '@/components/site/application-form';
import { BranchCard } from '@/components/site/branch-card';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Container } from '@/components/ui/container';
import { publicApi } from '@/lib/api/public';

export const metadata: Metadata = {
  title: 'Aloqa',
  description: "Joylinks bilan bog'laning: telefon, manzil va filiallar.",
};

export default async function ContactsPage() {
  const [settings, branches, courses] = await Promise.all([
    publicApi.settings(),
    publicApi.branches(),
    publicApi.courses(),
  ]);

  return (
    <>
      <PageHero
        title="Biz bilan bog'laning"
        description="Savollaringiz bormi? Qo'ng'iroq qiling, yozing yoki filiallarimizga tashrif buyuring."
        breadcrumbs={[{ label: 'Aloqa' }]}
      />

      <section className="bg-white py-14 sm:py-24 lg:py-32">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <dl className="border-t border-slate-200">
              {settings.phone && (
                <ContactRow label="Telefon" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, '')}`} />
              )}
              {settings.email && (
                <ContactRow label="Email" value={settings.email} href={`mailto:${settings.email}`} />
              )}
              <ContactRow label="Bosh ofis" value={settings.address} />
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="max-w-xl">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-ink-950">Ariza qoldiring</h2>
            <ApplicationForm courses={courses} />
          </Reveal>
        </Container>
      </section>

      {branches.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-14 sm:py-24 lg:py-32">
          <Container>
            <h2 className="mb-12 text-3xl font-semibold tracking-tight text-ink-950">Filiallarimiz</h2>
            <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href?: string;
}

function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-slate-200 py-5">
      <dt className="text-slate-600">{label}</dt>
      <dd className="text-lg text-ink-950">
        {href ? (
          <a href={href} className="hover:text-brand-700">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
