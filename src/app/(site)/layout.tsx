import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { publicApi } from '@/lib/api/public';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, courses] = await Promise.all([publicApi.settings(), publicApi.courses()]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Asosiy kontentga o&apos;tish
      </a>
      <Header phone={settings.phone} />
      <main id="main">{children}</main>
      <Footer settings={settings} courses={courses} />
    </>
  );
}
