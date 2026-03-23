import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function authMiddleware(
  request: NextRequest,
  response: NextResponse | null,
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  // 1. Get token from cookies
  const token = request.cookies.get('token')?.value;

  // Paths that can be accessed without authentication
  const isAuthPage = pathname === '/' || pathname === '/register';
  
  // 2. Redirect authenticated users away from login/register to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Define protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // 4. Handle unauthenticated access to protected routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  return response || NextResponse.next();
}
