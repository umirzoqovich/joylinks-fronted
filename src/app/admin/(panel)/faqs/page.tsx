'use client';

import { MutedCell, TextCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { FaqForm } from '@/components/admin/forms/faq-form';
import type { Faq } from '@/types';

export default function FaqsAdminPage() {
  return (
    <CrudPage<Faq>
      resource="faqs"
      title="Ko'p beriladigan savollar"
      description="Bosh sahifadagi FAQ bo'limi"
      entityName="savol"
      searchText={(faq) => `${faq.question} ${faq.answer}`}
      renderForm={(props) => <FaqForm {...props} />}
      columns={[
        {
          key: 'question',
          header: 'Savol',
          cell: (faq) => <TextCell title={faq.question} subtitle={faq.answer} />,
        },
        {
          key: 'order',
          header: 'Tartib',
          cell: (faq) => <MutedCell>{faq.order}</MutedCell>,
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (faq) => <VisibilityBadge visible={faq.isPublished} />,
        },
      ]}
    />
  );
}
