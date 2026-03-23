import type { NextRequest } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import runMiddlewares from '@/middleware/runMiddlewares';

export default async function proxy(request: NextRequest) {
  return await runMiddlewares(request, [authMiddleware]);
}

export const config = {
  matcher: ['/:path*'],
};
