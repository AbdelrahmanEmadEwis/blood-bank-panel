'use server';

import { apiClient } from '@/lib/api';
import type { Statistics } from '../types';

export async function getStatisticsAction() {
  const res = await apiClient<Statistics>(`/statistics`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    return { ok: false, error: res.error || 'Failed to fetch statistics' };
  }

  return { ok: true, data: res.data };
}
