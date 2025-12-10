import { vi } from 'vitest';

import type { createTokenManager } from '../token-manager';

/**
 * Creates a mock token manager service
 */
export const createMockTokenManager = (): ReturnType<typeof createTokenManager> => {
  return {
    getToken: vi.fn().mockResolvedValue('mock-token'),
  };
};
