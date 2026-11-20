'use client';

import { MutedCell, TextCell, VisibilityBadge } from '@/components/admin/cells';
import { CrudPage } from '@/components/admin/crud-page';
import { BranchForm } from '@/components/admin/forms/branch-form';
import type { Branch } from '@/types';

export default function BranchesAdminPage() {
  return (
    <CrudPage<Branch>
      resource="branches"
      title="Filiallar"
      description="O'quv markazi manzillari"
      entityName="filial"
      searchText={(branch) => `${branch.name} ${branch.address}`}
      renderForm={(props) => <BranchForm {...props} />}
      columns={[
        {
          key: 'name',
          header: 'Filial',
          cell: (branch) => <TextCell title={branch.name} subtitle={branch.address} />,
        },
        {
          key: 'phone',
          header: 'Telefon',
          cell: (branch) => <MutedCell>{branch.phone}</MutedCell>,
        },
        {
          key: 'hours',
          header: 'Ish vaqti',
          cell: (branch) => <MutedCell>{branch.workingHours}</MutedCell>,
        },
        {
          key: 'status',
          header: 'Holat',
          cell: (branch) => <VisibilityBadge visible={branch.isActive} />,
        },
      ]}
    />
  );
}
