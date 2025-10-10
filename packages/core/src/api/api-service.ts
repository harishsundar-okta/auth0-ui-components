import { createApiError, isApiError, normalizeError } from './api-error';
import type { RequestOptions, HttpMethod, ErrorResponse } from './api-types';

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
} as const;

function buildHeaders(customHeaders?: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (customHeaders) {
    Object.assign(headers, customHeaders);
  }

  return headers;
}

async function request<T>(
  endpoint: string,
  method: HttpMethod,
  options: RequestOptions = {},
  enableLogging = false,
): Promise<T> {
  const { body, queryParams, headers: customHeaders, fetcher = fetch, abortSignal } = options;

  let url = endpoint;
  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null) {
        params.append(key, String(value));
      }
    });
    url += `?${params}`;
  }

  const reqHeaders = buildHeaders(customHeaders);

  const requestInit: RequestInit = {
    method,
    headers: reqHeaders,
    credentials: 'include',
    ...(abortSignal && { signal: abortSignal }),
  };

  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  if (enableLogging) {
    console.debug(`[APIService] ${method} ${url}`, requestInit);
  }

  try {
    const response = await fetcher(url, requestInit);

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const message =
        (data as ErrorResponse)?.message || STATUS_MESSAGES[response.status] || 'Request failed';

      throw createApiError(message, response.status, data);
    }

    if (enableLogging) {
      console.debug(`[APIService] Response from ${url}`, data);
    }

    return data as T;
  } catch (err) {
    if (isApiError(err)) throw err;

    const normalizedError = normalizeError(err, {
      fallbackMessage: 'Unexpected network or API error',
    });

    throw createApiError(normalizedError.message, 0, undefined);
  }
}

export function get<T = unknown>(
  endpoint: string,
  options?: RequestOptions,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'GET', options, enableLogging);
}

export function post<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: RequestOptions,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'POST', { ...options, body }, enableLogging);
}

export function put<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: RequestOptions,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'PUT', { ...options, body }, enableLogging);
}

export function patch<T = unknown>(
  endpoint: string,
  body: unknown,
  options?: RequestOptions,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'PATCH', { ...options, body }, enableLogging);
}

export function del<T = unknown>(
  endpoint: string,
  options?: RequestOptions,
  enableLogging = false,
): Promise<T> {
  return request<T>(endpoint, 'DELETE', options, enableLogging);
}
