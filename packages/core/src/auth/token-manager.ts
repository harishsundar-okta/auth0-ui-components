import { AuthDetailsCore, Auth0ContextInterface } from './auth-types';
import { toURL } from './auth-utils';

// Store pending promises by a unique key (scope + audience combination)
const pendingTokenRequests = new Map<string, Promise<string>>();

// Pure utility functions for token management
export const TokenUtils = {
  /**
   * Build audience URL from domain and path
   */
  buildAudience(domain: string, audiencePath: string): string {
    const domainURL = toURL(domain);
    return domainURL ? `${domainURL}${audiencePath}/` : '';
  },

  /**
   * Create a unique key for token requests
   */
  createRequestKey(scope: string, audience: string): string {
    return `${scope}:${audience}`;
  },

  /**
   * Check if the core client is initialized
   */
  isCoreClientInitialized(auth: AuthDetailsCore): void {
    if (!auth || !auth.contextInterface) {
      throw new Error('TokenUtils: CoreClient is not initialized.');
    }
  },

  /**
   * Validate token request parameters
   */
  validateTokenRequest(auth: AuthDetailsCore, scope: string): void {
    if (!auth.domain) {
      throw new Error('TokenUtils: Auth0 domain is not configured');
    }
    if (!scope) {
      throw new Error('TokenUtils: Scope is required');
    }
  },

  /**
   * Check if running in proxy mode. In proxy mode, don't send access tokens
   */
  isProxyMode(auth: AuthDetailsCore): boolean {
    return !!auth.authProxyUrl;
  },

  /**
   * Fetch token silently with fallback to popup
   */
  async fetchToken(
    contextInterface: Auth0ContextInterface,
    scope: string,
    audience: string,
    ignoreCache: boolean,
  ): Promise<string> {
    try {
      const token = await contextInterface.getAccessTokenSilently({
        authorizationParams: {
          audience,
          scope,
        },
        ...(ignoreCache ? { cacheMode: 'off' } : {}),
      });

      if (!token) {
        throw new Error('getAccessTokenSilently: Access token is not defined');
      }

      return token;
    } catch (error) {
      const token = await contextInterface.getAccessTokenWithPopup({
        authorizationParams: {
          audience,
          scope,
          prompt: 'consent',
        },
      });

      if (!token) {
        throw new Error('getAccessTokenWithPopup: Access token is not defined');
      }

      return token;
    }
  },
};

// Functional factory for token manager service
export function createTokenManager(auth: AuthDetailsCore) {
  return {
    /**
     * Get token with caching and deduplication
     */
    async getToken(
      scope: string,
      audiencePath: string,
      ignoreCache: boolean = false,
    ): Promise<string | undefined> {
      // Ensure core client is initialized before getting a token
      TokenUtils.isCoreClientInitialized(auth);

      if (TokenUtils.isProxyMode(auth)) {
        return Promise.resolve(undefined);
      }

      // Validate request
      TokenUtils.validateTokenRequest(auth, scope);

      // Build audience and request key
      const audience = TokenUtils.buildAudience(auth.domain!, audiencePath);
      const requestKey = TokenUtils.createRequestKey(scope, audience);

      // If ignoreCache is true, clear any pending request for this key
      if (ignoreCache) {
        pendingTokenRequests.delete(requestKey);
      }

      // Check if there's already a pending request for this token
      const existingRequest = pendingTokenRequests.get(requestKey);
      if (existingRequest) {
        return existingRequest;
      }

      // Create new token request
      const tokenPromise = TokenUtils.fetchToken(
        auth.contextInterface!,
        scope,
        audience,
        ignoreCache,
      );

      pendingTokenRequests.set(requestKey, tokenPromise);

      try {
        const token = await tokenPromise;
        return token;
      } finally {
        // Clean up the pending request after completion
        pendingTokenRequests.delete(requestKey);
      }
    },
  };
}
