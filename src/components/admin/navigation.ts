import {
  BookOpen,
  Building2,
  Handshake,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Newspaper,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const ADMIN_NAV: { title: string; items: AdminNavItem[] }[] = [
  {
    title: 'Asosiy',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/applications', label: 'Arizalar', icon: Inbox },
    ],
  },
  {
    title: 'Kontent',
    items: [
      { href: '/admin/courses', label: 'Kurslar', icon: BookOpen },
      { href: '/admin/mentors', label: 'Mentorlar', icon: Users },
      { href: '/admin/testimonials', label: 'Fikrlar', icon: MessageSquareQuote },
      { href: '/admin/partners', label: 'Hamkorlar', icon: Handshake },
      { href: '/admin/faqs', label: 'FAQ', icon: HelpCircle },
      { href: '/admin/branches', label: 'Filiallar', icon: Building2 },
      { href: '/admin/posts', label: 'Yangiliklar', icon: Newspaper },
    ],
  },
  {
    title: 'Tizim',
    items: [{ href: '/admin/settings', label: 'Sozlamalar', icon: Settings }],
  },
];
