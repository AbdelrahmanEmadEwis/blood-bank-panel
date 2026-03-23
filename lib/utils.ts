import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Build Query Params from an object of filters
export function buildQueryParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // Skip completely empty values (null, undefined, empty strings)
    if (value === undefined || value === null || value === '') return;
    // If the value is an Array (e.g. status: ["pending", "active"]), append multiple times
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, String(val));
        }
      });
      return;
    }

    // Otherwise, append standard primitive values
    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Strips empty strings and undefined/null values from an object.
 * Useful for preparing JSON payloads for APIs that reject empty strings for optional fields.
 */
export function cleanPayload<T extends Record<string, any>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== '' && v !== undefined && v !== null),
  ) as Partial<T>;
}

// Validate Data
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  return {
    success: true,
    data: result.data,
  };
}
