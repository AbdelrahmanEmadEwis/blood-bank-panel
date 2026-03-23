export type ApiSuccess<T> = {
  ok: true;
  data: T;
  status: number;
};

export type ApiFailure = {
  ok: false;
  error: string;
  status: number;
};

/** Discriminated union returned by every apiClient call. */
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type FetchOptions = Omit<RequestInit, 'cache'> & {
  /** Override HTTP cache behaviour. Defaults to "no-store". */
  cache?: RequestCache;
  /** Next.js ISR: revalidate after N seconds. `false` keeps the response forever (force-cache). */
  revalidate?: number | false;
  /** Next.js tag-based revalidation – pair with `revalidateTag()` in server actions. */
  tags?: string[];
  /** Internal flag to prevent infinite refresh token loops. */
  _retry?: boolean;
};
