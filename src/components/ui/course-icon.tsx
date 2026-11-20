import {
  BarChart3,
  Brain,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  Globe,
  Megaphone,
  Monitor,
  Palette,
  Server,
  Shield,
  Smartphone,
  Terminal,
  type LucideIcon,
} from 'lucide-react';

/** Admin paneldan tanlanadigan kurs ikonkalari */
export const COURSE_ICONS = {
  code: Code2,
  server: Server,
  terminal: Terminal,
  palette: Palette,
  smartphone: Smartphone,
  brain: Brain,
  monitor: Monitor,
  shield: Shield,
  database: Database,
  chart: BarChart3,
  globe: Globe,
  cpu: Cpu,
  gamepad: Gamepad2,
  megaphone: Megaphone,
} satisfies Record<string, LucideIcon>;

export type CourseIconName = keyof typeof COURSE_ICONS;

export function CourseIcon({ name, className }: { name: string; className?: string }) {
  const Icon = COURSE_ICONS[name as CourseIconName] ?? Code2;
  return <Icon className={className} />;
}
