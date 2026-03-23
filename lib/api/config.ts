/**
 * Central API configuration.
 * Set NEXT_PUBLIC_API_BASE_URL in your .env to point at your backend.
 */
export const API_CONFIG = {
  /** Base URL prepended to every endpoint string in apiClient(). */
  baseUrl: process.env.API_BASE_URL,

  /** Default request headers sent with every call. */
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  /** Default cache strategy for fetch calls without explicit cache or next options. */
  defaultCache: 'no-store' as RequestCache,
} as const;
