'use client';

import { MutedCell, PersonCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { PartnerForm } from '@/components/admin/forms/partner-form';
import type { Partner } from '@/types';

export default function PartnersAdminPage() {
  return (
    <CrudPage<Partner>
      resource="partners"
      title="Hamkorlar"
      description="Bitiruvchilar ishlayotgan kompaniyalar (bosh sahifadagi lenta)"
      entityName="hamkor"
      searchText={(partner) => partner.name}
      renderForm={(props) => <PartnerForm {...props} />}
      columns={[
        {
          key: 'name',
          header: 'Kompaniya',
          cell: (partner) => <PersonCell name={partner.name} subtitle={partner.website} photo={partner.logo} />,
        },
        {
          key: 'order',
          header: 'Tartib',
          cell: (partner) => <MutedCell>{partner.order}</MutedCell>,
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (partner) => <VisibilityBadge visible={partner.isActive} />,
        },
      ]}
    />
  );
}
