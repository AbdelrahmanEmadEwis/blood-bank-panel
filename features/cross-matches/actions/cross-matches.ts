/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { apiClient } from '@/lib/api';
import { buildQueryParams, validateData } from '@/lib/utils';
import type { CrossMatch, PaginatedCrossMatchesResponse, CreateCrossMatchValues } from '../types';
import { createCrossMatchSchema } from '../schema/create-cross-matches.schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { ActionState } from '@/types/action-state';




// get all cross matches
export async function getAllCrossMatchesAction(
  page?: number,
  page_size?: number,
  filters?: Record<string, any>,
): Promise<PaginatedCrossMatchesResponse> {
  const queryString = buildQueryParams({ ...filters });
  const res = await apiClient<CrossMatch[]>(`/cross_matches${queryString}`);

  if (res.ok && res.data && Array.isArray(res.data)) {
    return {
      results: res.data,
      count: res.data.length,
      next: null,
      previous: null,
    };
  }

  throw new Error((res as any).error || 'Failed to fetch cross matches via API');
}

// get cross match by id
export async function getCrossMatchAction(id: string): Promise<CrossMatch> {
  const res = await apiClient<CrossMatch>(`/cross_matches/${id}`);
  if (res.ok && res.data) {
    return res.data;
  }

  throw new Error((res as any).error || 'Failed to fetch cross match details');
}

// sign cross match
export async function signCrossMatchAction(id: number, signature_code: string) {
  const res = await apiClient<any>(`/cross_matches/${id}/sign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ signature_code }),
    skipAuthRedirect: true,
  });

  if (!res.ok) {
    return { ok: false, error: res.error || 'Failed to sign cross match' };
  }

  revalidatePath(`/dashboard/matches/${id}`);
  revalidatePath('/dashboard/matches');
  return { ok: true };
}


// create cross match
export async function createCrossMatchAction(
  _prev: ActionState<CreateCrossMatchValues>,
  formData: FormData,
): Promise<ActionState<CreateCrossMatchValues>> {
  const rawData = Object.fromEntries(formData.entries());

  const validated = validateData(createCrossMatchSchema, rawData);

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors as Partial<Record<keyof CreateCrossMatchValues, string[]>>,
    };
  }

  const res = await apiClient<CrossMatch>(`/cross_matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validated.data),
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Something went wrong.',
    };
  }

  revalidatePath('/dashboard/matches');
  redirect('/dashboard/matches');
}

// update cross match status
export async function updateCrossMatchStatusAction(
  id: number,
  result: string,
) {
  const res = await apiClient<CrossMatch>(`/cross_matches/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ final_result: result }),
  });

  if (!res.ok) {
    return { ok: false, error: res.error || 'Failed to update cross match status' };
  }

  revalidatePath(`/dashboard/matches/${id}`);
  revalidatePath('/dashboard/matches');
  return { ok: true };
}
