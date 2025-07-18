export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  retryCount?: number;
  token?: string; // auth token to be sent in Authorization header
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
