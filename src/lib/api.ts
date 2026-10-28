import type { ApiHealthResult, HealthResponse } from '@/types/api';

/**
 * Base API URL configured via server-side environment variable.
 * Does NOT expose secrets or use NEXT_PUBLIC prefix for backend endpoints.
 */
export const API_BASE_URL =
  process.env.API_BASE_URL || 'http://127.0.0.1:8000/api';

/**
 * Performs a server-side health check request against the Laravel REST API.
 * Handles timeouts, network unreachability, and HTTP errors gracefully.
 */
export async function getApiHealth(): Promise<ApiHealthResult> {
  const startTime = performance.now();
  const endpoint = `${API_BASE_URL}/health`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);

    if (!response.ok) {
      return {
        data: null,
        isOnline: false,
        statusCode: response.status,
        errorMessage: `Backend responded with HTTP ${response.status} (${response.statusText || 'Error'})`,
        latencyMs,
      };
    }

    const data: HealthResponse = await response.json();

    return {
      data,
      isOnline: Boolean(data && data.success),
      statusCode: response.status,
      errorMessage: null,
      latencyMs,
    };
  } catch (error: unknown) {
    const latencyMs = Math.round(performance.now() - startTime);
    let message = 'Unable to connect to Laravel backend service.';

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        message = 'Connection timed out while reaching backend API (4s timeout).';
      } else if (error.message.includes('fetch failed')) {
        message = 'Backend API is currently offline or unreachable at ' + API_BASE_URL;
      } else {
        message = error.message;
      }
    }

    return {
      data: null,
      isOnline: false,
      statusCode: null,
      errorMessage: message,
      latencyMs,
    };
  }
}
