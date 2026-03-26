/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { apiClient } from '@/lib/api';
import { buildQueryParams, cleanPayload, validateData } from '@/lib/utils';
import {
  type Patient,
  type CreatePatientValues,
  type EditPatientValues,
  type PaginatedPatientsResponse,
  createPatientSchema,
  editPatientSchema,
} from '@/features/patients/types';

import type { ActionState } from '@/types/action-state';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// get all patients
export async function getAllPatientsAction(
  page?: number,
  page_size?: number,
  filters?: Record<string, any>,
): Promise<PaginatedPatientsResponse> {
  const queryString = buildQueryParams({ ...filters });
  const res = await apiClient<Patient[]>(`/patients${queryString}`);

  if (!res.ok) {
    throw new Error(res.error || 'Failed to fetch patients via API');
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

// get patient by id
export async function getPatientAction(patientId: string): Promise<Patient> {
  const res = await apiClient<Patient>(`/patients/${patientId}`);
  if (!res.ok) {
    throw new Error(res.error || 'Failed to fetch patient details');
  }

  if (res.data) {
    return res.data;
  }

  throw new Error('No data received from API');
}

// edit patient
export async function editPatientAction(
  _prev: ActionState<EditPatientValues>,
  formData: FormData,
): Promise<ActionState<EditPatientValues>> {
  const rawData = Object.fromEntries(formData.entries());
  const patientId = rawData.patientId as string;
  if (!patientId) {
    return { status: 'error', message: 'Patient ID is missing.' };
  }

  const validated = validateData(editPatientSchema, rawData);
  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors as Partial<Record<keyof EditPatientValues, string[]>>,
    };
  }

  const payload = cleanPayload(validated.data);

  const res = await apiClient<Patient>(`/patients/${patientId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Failed to update patient.',
    };
  }

  revalidatePath('/dashboard/patients');
  redirect('/dashboard/patients');
}

// delete patient
export async function deletePatientAction(patientId: number): Promise<boolean> {
  const res = await apiClient<{ success?: boolean }>(`/patients/${patientId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(res.error || 'Failed to delete patient via API');
  }

  revalidatePath('/dashboard/patients');
  return true;
}

// create patient
export async function createPatientAction(
  _prev: ActionState<CreatePatientValues>,
  formData: FormData,
): Promise<ActionState<CreatePatientValues>> {
  const rawData = Object.fromEntries(formData.entries());

  const validated = validateData(createPatientSchema, rawData);

  if (!validated.success) {
    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors: validated.errors as Partial<Record<keyof CreatePatientValues, string[]>>,
    };
  }

  // Strip empty strings/nulls from optional fields
  const payload = cleanPayload(validated.data);

  const res = await apiClient<Patient>(`/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return {
      status: 'error',
      message: res.error || 'Failed to create patient.',
    };
  }

  revalidatePath('/dashboard/patients');
  redirect('/dashboard/patients');
}

