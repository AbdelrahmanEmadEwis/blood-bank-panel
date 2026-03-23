import { CreateCrossMatchForm } from '@/features/cross-matches';
import { PageContainer } from '@/components/layout';

export const metadata = {
  title: 'Initiate Cross Match | Magdi Yaccoub Heart Foundation',
  description: 'Perform a new cross matching procedure by selecting a patient and a blood unit.',
};

export default function CreateCrossMatchPage() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-6 items-center py-8'>
        <CreateCrossMatchForm />
      </div>
    </PageContainer>
  );
}
