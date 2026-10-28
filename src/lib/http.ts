import type { ApiErrorBody } from '@/types/api';

/**
 * Base URL of the Laravel API (ending in /api).
 * - Server components/route handlers use the private API_BASE_URL.
 * - Browser code can only see NEXT_PUBLIC_* variables, so forms use NEXT_PUBLIC_API_BASE_URL.
 */
const DEFAULT_API_URL = 'http://127.0.0.1:8000/api';

export function getApiBaseUrl(): string {
  const isBrowser = typeof window !== 'undefined';
  const url = isBrowser
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

  return (url || DEFAULT_API_URL).replace(/\/+$/, '');
}

/** Error raised for any non-2xx or unreachable API response. */
export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: Record<string, string>;
  readonly requestId: string | null;

  constructor(message: string, status: number, fieldErrors: Record<string, string> = {}, requestId: string | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.requestId = requestId;
  }

  get isValidation(): boolean {
    return this.status === 422;
  }

  get isRateLimited(): boolean {
    return this.status === 429;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Next.js fetch cache hint for server-side reads. */
  revalidate?: number | false;
}

/**
 * Typed JSON request against /api/v1. Throws ApiError with a user-safe message;
 * never surfaces raw server text.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, query, signal, timeoutMs = 10000, revalidate } = options;

  const url = new URL(`${getApiBaseUrl()}/v1${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== null && value !== undefined && value !== '') url.searchParams.set(key, String(value));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener('abort', () => controller.abort());

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      ...(method === 'GET'
        ? revalidate === undefined
          ? { cache: 'no-store' as const }
          : { next: { revalidate } }
        : {}),
    });
  } catch {
    throw new ApiError('We could not reach the server. Please check your connection and try again.', 0);
  } finally {
    clearTimeout(timeout);
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // Non-JSON body (e.g. proxy error page): fall through to the status-based message.
  }

  if (!response.ok) {
    const errorBody = (payload ?? {}) as Partial<ApiErrorBody>;
    const fieldErrors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(errorBody.errors ?? {})) {
      fieldErrors[field] = messages[0];
    }

    throw new ApiError(messageFor(response.status, errorBody.message), response.status, fieldErrors, errorBody.request_id ?? null);
  }

  return payload as T;
}

function messageFor(status: number, serverMessage?: string): string {
  if (status === 422) return 'Please correct the highlighted fields and try again.';
  if (status === 429) return 'Too many submissions in a short time. Please wait a minute and try again.';
  if (status === 404) return 'The requested item could not be found.';
  if (status >= 500) return 'Something went wrong on our side. Please try again shortly.';
  return serverMessage || 'We could not process your request.';
}
