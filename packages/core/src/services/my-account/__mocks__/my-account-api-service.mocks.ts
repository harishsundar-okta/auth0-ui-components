import { vi } from 'vitest';

import type { initializeMyAccountClient } from '../my-account-api-service';

/**
 * Creates a mock MyAccount API client
 */
export const createMockMyAccountClient = (): ReturnType<typeof initializeMyAccountClient> => {
  return {
    client: {} as any,
    setLatestScopes: vi.fn(),
  };
};
