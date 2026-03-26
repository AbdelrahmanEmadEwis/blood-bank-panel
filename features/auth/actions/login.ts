'use server';

import { cookies } from 'next/headers';
import { apiClient } from '@/lib/api';
import { validateData } from '@/lib/utils';
import { loginSchema, type LoginData } from '../schema/login.schema';
import type { ActionState } from '@/types/action-state';

export async function loginAction(
  _prev: ActionState<LoginData>,
  formData: FormData,
): Promise<ActionState<LoginData>> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = validateData(loginSchema, rawData);

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors,
    };
  }

  const res = await apiClient<{ access_token: string; refresh_token: string }>(
    `/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(validated.data),
      skipAuthRedirect: true,
    },
  );
  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Login failed. Please check your credentials.',
    };
  }

  const { access_token, refresh_token } = res.data;

  // Store the tokens in HTTP-only cookies
  const cookieStore = await cookies();
  if (access_token) {
    cookieStore.set('token', access_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  if (refresh_token) {
    cookieStore.set('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return {
    status: 'success',
    message: 'Login successful! Redirecting...',
  };
}
