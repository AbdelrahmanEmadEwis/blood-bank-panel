import { RegisterViewPage } from '@/features/auth';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterViewPage />
    </Suspense>
  );
}
