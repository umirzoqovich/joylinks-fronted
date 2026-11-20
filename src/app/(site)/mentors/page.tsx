import type { Metadata } from 'next';

import { MentorCard } from '@/components/site/mentor-card';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { publicApi } from '@/lib/api/public';

export const metadata: Metadata = {
  title: 'Mentorlar',
  description: "Joylinks mentorlari — yirik kompaniyalarda ishlayotgan tajribali mutaxassislar.",
};

export default async function MentorsPage() {
  const mentors = await publicApi.mentors();

  return (
    <>
      <PageHero
        title="Bizning mentorlar"
        description="Har bir mentorimiz — o'z sohasida yillar davomida ishlab kelayotgan amaliyotchi mutaxassis."
        breadcrumbs={[{ label: 'Mentorlar' }]}
      />

      <section className="bg-white py-10 sm:py-16 lg:py-24">
        <Container>
          {mentors.length === 0 ? (
            <EmptyState title="Mentorlar ro'yxati tez orada qo'shiladi" />
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mentors.map((mentor, index) => (
                <Reveal key={mentor.id} delay={(index % 4) * 0.06} className="h-full">
                  <MentorCard mentor={mentor} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
