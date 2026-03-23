import { getBloodUnitAction, BloodUnitDetails } from '@/features/blood-units';
import { PageContainer } from '@/components/layout';
import { notFound } from 'next/navigation';

interface BloodUnitPageProps {
  params: Promise<{ id: string }>;
}

export default async function BloodUnitPage({ params }: BloodUnitPageProps) {
  const { id } = await params;

  let bloodUnit;
  try {
    bloodUnit = await getBloodUnitAction(id);
  } catch {
    notFound();
  }

  return (
    <PageContainer>
        <BloodUnitDetails bloodUnit={bloodUnit} />
    </PageContainer>
  );
}
