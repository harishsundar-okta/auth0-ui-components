export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type FetcherFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export interface RequestOptions {
  body?: unknown;
  retryCount?: number;
  timeoutInSeconds?: number;
  maxRetries?: number;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
  headers?: Record<string, string>;
  fetcher?: FetcherFunction;
}

export interface HttpRequest {
  url: string;
  method?: HttpMethod;
  options?: RequestOptions;
}

export interface ErrorResponse {
  message?: string;
}

/**
 * Represents a standardized API error shape.
 */
export interface ApiError {
  readonly name: 'ApiError';
  readonly message: string;
  readonly status: number;
  readonly data?: {
    error?: string;
    [key: string]: unknown;
  };
}
