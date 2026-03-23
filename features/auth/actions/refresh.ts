'use server';

import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api';

export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('token')?.value;

  if (!accessToken) {
    return { ok: false, error: 'No access token available' };
  }

  const res = await apiClient<{ access_token: string; refresh_token?: string }>(
    `/auth/refresh`,
    {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken }),
    },
  );

  if (!res.ok) {
    return { ok: false, error: res.error || 'Token refresh failed' };
  }

  const { access_token, refresh_token } = res.data;
  if (access_token) {
    const cookieStore = await cookies();
    cookieStore.set('token', access_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  if (refresh_token) {
    const cookieStore = await cookies();
    cookieStore.set('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
  return { ok: true };
}
