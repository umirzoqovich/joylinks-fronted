import type { Metadata } from 'next';

import { CourseCard } from '@/components/site/course-card';
import { ApplicationSection } from '@/components/site/home/application-section';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { publicApi } from '@/lib/api/public';

export const metadata: Metadata = {
  title: 'Kurslar',
  description: "Joylinks IT akademiyasidagi barcha yo'nalishlar: dasturlash, dizayn, data science va boshqalar.",
};

export default async function CoursesPage() {
  const courses = await publicApi.courses();

  return (
    <>
      <PageHero
        title="Barcha kurslar"
        description="Noldan boshlab professional darajagacha — o'zingizga mos yo'nalishni tanlang va kelajak kasbini egallang."
        breadcrumbs={[{ label: 'Kurslar' }]}
      />

      <section className="bg-white py-10 sm:py-16 lg:py-24">
        <Container>
          {courses.length === 0 ? (
            <EmptyState title="Kurslar tez orada qo'shiladi" />
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Reveal key={course.id} delay={(index % 3) * 0.06} className="h-full">
                  <CourseCard course={course} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <ApplicationSection courses={courses} />
    </>
  );
}
