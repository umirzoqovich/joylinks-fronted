import { Badge } from '@/components/ui/badge';
import { APPLICATION_STATUS } from '@/lib/constants';
import type { ApplicationStatus } from '@/types';

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, tone } = APPLICATION_STATUS[status];
  return (
    <Badge tone={tone} dot>
      {label}
    </Badge>
  );
}
