/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { apiClient } from '@/lib/api';
import { buildQueryParams, cleanPayload, validateData } from '@/lib/utils';
import {
  type BloodUnit,
  type BloodUnitDetail,
  type CreateBloodUnitValues,
  type EditBloodUnitValues,
  type PaginatedBloodUnitsResponse,
  createBloodUnitSchema,
  editBloodUnitSchema,
} from '../types';

import type { ActionState } from '@/types/action-state';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// get all blood units
export async function getAllBloodUnitsAction(
  page?: number,
  page_size?: number,
  filters?: Record<string, any>,
): Promise<PaginatedBloodUnitsResponse> {
  const queryString = buildQueryParams({ ...filters });
  const res = await apiClient<BloodUnit[]>(`/blood_units${queryString}`);

  if (!res.ok) {
    throw new Error(res.error || 'Failed to fetch blood units via API');
  }

  if (res.data && Array.isArray(res.data)) {
    return {
      results: res.data,
      count: res.data.length,
      next: null,
      previous: null,
    };
  }

  throw new Error('Invalid data format received from API');
}

// get blood unit by id
export async function getBloodUnitAction(bloodUnitId: string): Promise<BloodUnitDetail> {
  const res = await apiClient<BloodUnitDetail>(`/blood_units/${bloodUnitId}`);
  if (!res.ok) {
    throw new Error(res.error || 'Failed to fetch blood unit details');
  }

  if (res.data) {
    return res.data;
  }

  throw new Error('No data received from API');
}

// create blood unit
export async function createBloodUnitAction(
  _prev: ActionState<CreateBloodUnitValues>,
  formData: FormData,
): Promise<ActionState<CreateBloodUnitValues>> {
  const rawData = Object.fromEntries(formData.entries());

  const validated = validateData(createBloodUnitSchema, rawData);

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors as Partial<Record<keyof CreateBloodUnitValues, string[]>>,
    };
  }

  const payload = cleanPayload(validated.data);

  const res = await apiClient<BloodUnit>(`/blood_units`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Failed to create blood unit.',
    };
  }

  revalidatePath('/dashboard/blood-units');
  redirect('/dashboard/blood-units');
}

// edit blood unit
export async function editBloodUnitAction(
  _prev: ActionState<EditBloodUnitValues>,
  formData: FormData,
): Promise<ActionState<EditBloodUnitValues>> {
  const rawData = Object.fromEntries(formData.entries());
  const bloodUnitId = rawData.bloodUnitId as string;
  if (!bloodUnitId) {
    return { status: 'error', message: 'Blood Unit ID is missing.' };
  }

  const validated = validateData(editBloodUnitSchema, rawData);
  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors as Partial<Record<keyof EditBloodUnitValues, string[]>>,
    };
  }

  const payload = cleanPayload(validated.data);

  const res = await apiClient<BloodUnit>(`/blood_units/${bloodUnitId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Failed to update blood unit.',
    };
  }

  revalidatePath('/dashboard/blood-units');
  redirect('/dashboard/blood-units');
}

// delete blood unit
export async function deleteBloodUnitAction(bloodUnitId: number) {
  const res = await apiClient<{ success?: boolean }>(`/blood_units/${bloodUnitId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    return { ok: false, error: res.error || 'Failed to delete blood unit' };
  }

  revalidatePath('/dashboard/blood-units');
  return { ok: true };
}
