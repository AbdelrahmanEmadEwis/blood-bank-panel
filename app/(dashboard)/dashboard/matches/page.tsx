import { PageContainer } from '@/components/layout';
import { CrossMatchesTable } from '@/features/cross-matches';

export const metadata = {
  title: 'Cross Matches | Magdi Yaccoub Heart Foundation',
  description: 'Manage and perform blood cross matching',
};

export default function MatchesPage() {
  return (
    <PageContainer>
      <CrossMatchesTable />
    </PageContainer>
  );
}
