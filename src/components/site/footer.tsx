import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { CONTACT_ADDRESS, CONTACT_PHONE, SITE_LOGO_SRC } from '@/lib/constants';
import type { CourseSummary, SiteSettings } from '@/types';

import { Logo } from './logo';
import { SITE_NAV } from './nav-links';
import { SocialLinks } from './social-links';

interface FooterProps {
  settings: SiteSettings;
  courses: CourseSummary[];
}

export function Footer({ settings, courses }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer data-header-theme="dark" className="bg-ink-950 text-slate-400">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm leading-relaxed">
              Joylinks — amaliyotga yo&apos;naltirilgan zamonaviy IT akademiya. Biz bilan
              kelajak kasbini egallang va orzuingizdagi kompaniyada ishlang.
            </p>
            <SocialLinks settings={settings} className="mt-6" />
          </div>

          <FooterColumn title="Kurslar" className="lg:col-span-3 lg:col-start-5">
            {courses.slice(0, 6).map((course) => (
              <FooterLink key={course.id} href={`/courses/${course.slug}`}>
                {course.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Sahifalar" className="lg:col-span-2">
            {SITE_NAV.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Aloqa" className="lg:col-span-3">
            <ContactItem icon={Phone} href={`tel:${(settings.phone || CONTACT_PHONE).replace(/\s/g, '')}`}>
              {settings.phone || CONTACT_PHONE}
            </ContactItem>
            {settings.email && (
              <ContactItem icon={Mail} href={`mailto:${settings.email}`}>
                {settings.email}
              </ContactItem>
            )}
            <ContactItem icon={MapPin}>{CONTACT_ADDRESS}</ContactItem>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {year} Joylinks. Barcha huquqlar himoyalangan.</p>
          <p>Termiz, O&apos;zbekiston</p>
        </div>
      </Container>

      {/* Sahifa oxiridagi katta logotip */}
      <div aria-hidden className="overflow-hidden px-4 pb-10 select-none sm:px-6 lg:px-8">
        <Image
          src={SITE_LOGO_SRC}
          alt=""
          width={1000}
          height={387}
          className="mx-auto h-auto w-full max-w-4xl opacity-[0.12] brightness-0 invert"
        />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xs font-medium tracking-[0.14em] text-slate-300 uppercase">{title}</h2>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition hover:text-white hover:underline underline-offset-4">
        {children}
      </Link>
    </li>
  );
}

function ContactItem({
  icon: Icon,
  href,
  children,
}: {
  icon: typeof Phone;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <>
      <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" />
      <span>{children}</span>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="flex gap-3 transition hover:text-white">
          {content}
        </a>
      ) : (
        <div className="flex gap-3">{content}</div>
      )}
    </li>
  );
}
