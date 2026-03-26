import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_CONFIG } from './config';
import type { ApiResponse, FetchOptions } from './types';

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const { tags, revalidate, cache, headers: customHeaders, ...rest } = options;

  const hasNextOptions = tags !== undefined || revalidate !== undefined;
  // get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  // Prepare headers
  const baseHeaders: Record<string, string> = { ...API_CONFIG.headers };

  // If we are sending FormData, remove the default Content-Type so fetch can set the multipart boundary automatically
  if (rest.body instanceof FormData) {
    delete baseHeaders['Content-Type'];
  }

  const fetchOptions: RequestInit & {
    next?: { tags?: string[]; revalidate?: number | false };
  } = {
    headers: {
      ...baseHeaders,
      ...(customHeaders as Record<string, string>),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(hasNextOptions
      ? {
          next: {
            ...(tags !== undefined && { tags }),
            ...(revalidate !== undefined && { revalidate }),
          },
        }
      : { cache: cache ?? API_CONFIG.defaultCache }),
    ...rest,
  };

  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, fetchOptions);
    
    // Default 401 behavior is to redirect to login, unless skipAuthRedirect is true
    if (res.status === 401 && !options.skipAuthRedirect) {
      // Clear cookies on unauthorized
      cookieStore.delete('token');
      cookieStore.delete('refresh_token');
      cookieStore.delete('role');

      const headerList = await headers();
      const referer = headerList.get('referer') || '/';
      redirect(`/?error=session_expired&callback=${encodeURIComponent(referer)}`);
    }

    // if 403 Forbidden, redirect to custom forbidden page
    if (res.status === 403) {
      redirect('/forbidden');
    }

    if (!res.ok) {
      let message = '';
      let code = res.status;
      let apiStatus = res.statusText;

      try {
        const body = await res.json();
        const apiError = body?.message || body?.detail || body?.error;
        if (typeof apiError === 'string' && apiError.length > 0) {
          message = apiError;
        }
        if (body?.code) code = body.code;
        if (body?.status && typeof body.status === 'string') apiStatus = body.status;
      } catch {
        // use status text as fallback if no body
        message = res.statusText;
      }

      return {
        ok: false,
        error: message || 'Something went wrong. Please try again later.',
        status: res.status,
        code,
        apiStatus,
      };
    }

    let data: T = {} as T;
    const text = await res.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        // If not JSON, but status was OK, we just return empty data
      }
    }

    return { ok: true, data, status: res.status };
  } catch (err) {
    // If it's a redirect error from next/navigation, rethrow it
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
      throw err;
    }

    // Always return a user-friendly error for network/unknown errors
    return {
      ok: false,
      error: 'Unable to connect. Please check your internet connection or try again later.',
      status: 0,
      code: 0,
      apiStatus: 'Network Error',
    };
  }
}
