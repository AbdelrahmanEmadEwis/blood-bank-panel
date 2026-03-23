import { SignInViewPage } from '@/features/auth';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <Suspense>
      <SignInViewPage />
    </Suspense>
  );
}
