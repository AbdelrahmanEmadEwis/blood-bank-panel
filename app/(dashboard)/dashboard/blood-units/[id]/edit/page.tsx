import { getBloodUnitAction, EditBloodUnitForm } from '@/features/blood-units';
import { PageContainer } from '@/components/layout';
import { notFound } from 'next/navigation';

interface EditBloodUnitPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBloodUnitPage({ params }: EditBloodUnitPageProps) {
  const { id } = await params;

  let bloodUnit;
  try {
    bloodUnit = await getBloodUnitAction(id);
  } catch {
    notFound();
  }

  return (
    <PageContainer>
        <EditBloodUnitForm bloodUnit={bloodUnit} />
    </PageContainer>
  );
}
