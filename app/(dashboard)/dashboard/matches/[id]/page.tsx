import { getCrossMatchAction, CrossMatchDetails } from '@/features/cross-matches';
import { PageContainer } from '@/components/layout';
import { notFound } from 'next/navigation';

interface CrossMatchPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Cross Match Analysis | Magdi Yaccoub Heart Foundation',
  description: 'Detailed analysis and result report for blood compatibility test.',
};

export default async function CrossMatchPage({ params }: CrossMatchPageProps) {
  const { id } = await params;

  let crossMatch;
  try {
    crossMatch = await getCrossMatchAction(id);
  } catch (error) {
    console.error('Failed to fetch cross match:', error);
    notFound();
  }

  if (!crossMatch) {
    notFound();
  }

  return (
    <PageContainer>
      <CrossMatchDetails crossMatch={crossMatch} />
    </PageContainer>
  );
}
