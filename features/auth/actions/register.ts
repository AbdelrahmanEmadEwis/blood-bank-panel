'use server';

import { apiClient } from '@/lib/api';
import { validateData } from '@/lib/utils';
import { registerSchema, type RegisterData } from '../schema/register.schema';
import type { ActionState } from '@/types/action-state';
import { redirect } from 'next/navigation';

export async function registerAction(
  _prev: ActionState<RegisterData>,
  formData: FormData,
): Promise<ActionState<RegisterData>> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = validateData(registerSchema, rawData);

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors,
    };
  }

  const res = await apiClient<{
    id: number;
    fname: string;
    lname: string;
    email: string;
    role: string;
  }>(`/employees/register`, {
    method: 'POST',
    body: JSON.stringify(validated.data),
    skipAuthRedirect: true,
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Registration failed.',
    };
  }

  // Usually after registration, we either log in automatically or redirect to login
  // The user didn't specify auto-login, so I'll just redirect to login
  redirect('/');
}
