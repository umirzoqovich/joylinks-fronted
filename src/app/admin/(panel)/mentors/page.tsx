'use client';

import { MutedCell, PersonCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { MentorForm } from '@/components/admin/forms/mentor-form';
import type { Mentor } from '@/types';

type AdminMentor = Mentor & { _count: { courses: number } };

export default function MentorsAdminPage() {
  return (
    <CrudPage<AdminMentor, Mentor>
      resource="mentors"
      title="Mentorlar"
      description="O'qituvchilar jamoasi"
      entityName="mentor"
      searchText={(mentor) => `${mentor.fullName} ${mentor.position}`}
      renderForm={(props) => <MentorForm {...props} />}
      columns={[
        {
          key: 'name',
          header: 'Mentor',
          cell: (mentor) => <PersonCell name={mentor.fullName} subtitle={mentor.position} photo={mentor.photo} />,
        },
        {
          key: 'experience',
          header: 'Tajriba',
          cell: (mentor) => <MutedCell>{mentor.experienceYears} yil</MutedCell>,
        },
        {
          key: 'courses',
          header: 'Kurslar',
          cell: (mentor) => <MutedCell>{mentor._count.courses}</MutedCell>,
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (mentor) => <VisibilityBadge visible={mentor.isActive} />,
        },
      ]}
    />
  );
}
