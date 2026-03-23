'use server';

import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (refreshToken) {
    // Attempt to blacklist the refresh token on the backend using apiClient
    await apiClient('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  }

  // Aggressively clear authentication cookies
  cookieStore.delete('token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('role');

  // Redirect to the login page immediately
  redirect('/');
}
