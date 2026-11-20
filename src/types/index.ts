// Backend (Prisma) modellariga mos tiplar

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseFormat = 'OFFLINE' | 'ONLINE' | 'HYBRID';
export type ApplicationStatus = 'NEW' | 'CONTACTED' | 'ENROLLED' | 'REJECTED';

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface Course extends Timestamps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string | null;
  icon: string;
  color: string;
  durationMonths: number;
  lessonsPerWeek: number;
  lessonHours: number;
  price: number;
  oldPrice: number | null;
  level: CourseLevel;
  format: CourseFormat;
  skills: string[];
  curriculum: CurriculumModule[];
  isPopular: boolean;
  isPublished: boolean;
  order: number;
}

export type CourseSummary = Omit<Course, 'description' | 'curriculum'>;

export interface CourseDetails extends Course {
  mentors: Pick<Mentor, 'id' | 'fullName' | 'position' | 'photo' | 'experienceYears'>[];
}

export interface AdminCourse extends Course {
  _count: { applications: number; mentors: number };
}

export interface AdminCourseDetails extends Course {
  mentorIds: string[];
}

export interface Mentor extends Timestamps {
  id: string;
  fullName: string;
  position: string;
  bio: string | null;
  photo: string | null;
  experienceYears: number;
  studentsCount: number;
  skills: string[];
  telegram: string | null;
  instagram: string | null;
  linkedin: string | null;
  isActive: boolean;
  order: number;
}

export interface PublicMentor extends Mentor {
  courses: { title: string; slug: string }[];
}

export interface Testimonial extends Timestamps {
  id: string;
  fullName: string;
  photo: string | null;
  courseName: string;
  workplace: string | null;
  position: string | null;
  text: string;
  rating: number;
  videoUrl: string | null;
  isPublished: boolean;
  order: number;
}

export interface Partner extends Timestamps {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
  isActive: boolean;
  order: number;
}

export interface Faq extends Timestamps {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
  order: number;
}

export interface Branch extends Timestamps {
  id: string;
  name: string;
  address: string;
  landmark: string | null;
  phone: string;
  workingHours: string;
  mapUrl: string | null;
  image: string | null;
  isActive: boolean;
  order: number;
}

export interface Post extends Timestamps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: string | null;
  isPublished: boolean;
  publishedAt: string;
  views: number;
}

export type PostSummary = Omit<Post, 'content'>;

export interface Application extends Timestamps {
  id: string;
  fullName: string;
  phone: string;
  message: string | null;
  status: ApplicationStatus;
  note: string | null;
  courseId: string | null;
  course: { id: string; title: string } | null;
}

export interface SiteSettings {
  id: number;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  telegram: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  graduatesCount: number;
  employmentRate: number;
  mentorsCount: number;
  yearsOfExperience: number;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface Paginated<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface DashboardOverview {
  totals: {
    courses: number;
    mentors: number;
    testimonials: number;
    posts: number;
    applications: number;
  };
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsChart: { date: string; count: number }[];
  recentApplications: Application[];
}
