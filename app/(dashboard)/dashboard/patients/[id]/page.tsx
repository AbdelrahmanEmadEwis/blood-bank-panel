import { getPatientAction, EditPatientForm } from '@/features/patients';
import { PageContainer } from '@/components/layout';
import { notFound } from 'next/navigation';

interface EditPatientPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPatientPage({ params }: EditPatientPageProps) {
  const { id } = await params;

  let patient;
  try {
    patient = await getPatientAction(id);
  } catch {
    notFound();
  }

  return (
    <PageContainer>
      <div className='flex flex-col gap-6 items-center'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>Patient Details</h1>
          <p className='text-slate-500'>
            View and modify details for {patient.fname} {patient.lname}.
          </p>
        </div>

        <EditPatientForm patient={patient} />
      </div>
    </PageContainer>
  );
}
