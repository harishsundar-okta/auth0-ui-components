import type {
  AuthenticationAPIServiceInterface,
  BaseCoreClientInterface,
} from '../auth/auth-types';

import { createMFAController } from './my-account/mfa/mfa-controller';

/**
 * Creates an Authentication API service instance with access to various authentication operations.
 *
 * @param coreClient - The core client instance that provides authentication context and token management
 * @returns An authentication API service interface with MFA controller
 *
 * @example
 * ```typescript
 * const coreClient = await createCoreClient(authDetails);
 * const authService = createAuthenticationAPIService(coreClient);
 *
 * // Use MFA operations
 * const factors = await authService.mfa.fetchFactors();
 * ```
 */
export function createAuthenticationAPIService(
  coreClient: BaseCoreClientInterface,
): AuthenticationAPIServiceInterface {
  return {
    mfa: createMFAController(coreClient),
  };
}
