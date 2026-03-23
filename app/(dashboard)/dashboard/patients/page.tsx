import { PageContainer } from '@/components/layout';
import { PatientsTable } from '@/features/patients';

export default function PatientsPage() {
  return (
    <PageContainer>
      <PatientsTable />
    </PageContainer>
  );
}
