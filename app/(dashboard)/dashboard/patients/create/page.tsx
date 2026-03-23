import { CreatePatientForm } from '@/features/patients';
import { PageContainer } from '@/components/layout';

export default function CreatePatientPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6 items-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-slate-900'>Create Patient</h1>
          <p className='text-slate-500'>Add a new patient entry to the system.</p>
        </div>

        <CreatePatientForm />
      </div>
    </PageContainer>
  );
}
