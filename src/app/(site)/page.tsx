import { AdvantagesSection } from '@/components/site/home/advantages-section';
import { ApplicationSection } from '@/components/site/home/application-section';
import { CoursesSection } from '@/components/site/home/courses-section';
import { ExtrasSection } from '@/components/site/home/extras-section';
import { FaqSection } from '@/components/site/home/faq-section';
import { Hero } from '@/components/site/home/hero';
import { IntroSection } from '@/components/site/home/intro-section';
import { MentorsSection } from '@/components/site/home/mentors-section';
import { PartnersMarquee } from '@/components/site/home/partners-marquee';
import { ProcessSection } from '@/components/site/home/process-section';
import { GraduatesSection } from '@/components/site/home/graduates-section';
import { publicApi } from '@/lib/api/public';

export default async function HomePage() {
  const [settings, courses, mentors, testimonials, partners, faqs] = await Promise.all([
    publicApi.settings(),
    publicApi.courses(),
    publicApi.mentors(),
    publicApi.testimonials(),
    publicApi.partners(),
    publicApi.faqs(),
  ]);

  return (
    <>
      <Hero settings={settings} courses={courses} mentors={mentors} testimonials={testimonials} />
      <IntroSection />
      <AdvantagesSection settings={settings} />
      <CoursesSection courses={courses} />
      <MentorsSection mentors={mentors} />
      <ExtrasSection />
      <GraduatesSection testimonials={testimonials} instagramUrl={settings.instagram} />
      <PartnersMarquee partners={partners} />
      <ProcessSection settings={settings} />
      <ApplicationSection courses={courses} phone={settings.phone} />
      <FaqSection faqs={faqs} />
    </>
  );
}
