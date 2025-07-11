import { CoreClientInterface } from './types';

// Store pending promises by a unique key (scope + audience combination)
const pendingTokenRequests = new Map<string, Promise<string>>();

class TokenManager {
  constructor(private coreClient: CoreClientInterface) {}

  async getToken(
    scope: string,
    audiencePath: string,
    ignoreCache: boolean = false,
  ): Promise<string | undefined> {
    if (!this.coreClient.auth || !this.coreClient.auth.contextInterface) {
      throw new Error('getToken: CoreClient is not initialized.');
    }

    if (this.coreClient.isProxyMode()) {
      return Promise.resolve(undefined); // In proxy mode, don't send access tokens
    }

    const domain = this.coreClient.auth.domain;
    const audience = domain ? `${domain}${audiencePath}/` : '';

    if (!domain) {
      throw new Error('getToken: Auth0 domain is not configured');
    }
    if (!scope) {
      throw new Error('getToken: Scope is required');
    }

    // Create a unique key for this token request
    const requestKey = `${scope}:${audience}`;

    // If ignoreCache is true, clear any pending request for this key
    if (ignoreCache) {
      pendingTokenRequests.delete(requestKey);
    }

    // Check if there's already a pending request for this token
    const existingRequest = pendingTokenRequests.get(requestKey);

    if (existingRequest) {
      return existingRequest;
    }

    const tokenPromise = this.fetchToken(scope, audience, ignoreCache);
    pendingTokenRequests.set(requestKey, tokenPromise);

    try {
      const token = await tokenPromise;
      return token;
    } finally {
      // Clean up the pending request after completion
      pendingTokenRequests.delete(requestKey);
    }
  }

  private async fetchToken(scope: string, audience: string, ignoreCache: boolean): Promise<string> {
    try {
      const token = await this.coreClient.auth.contextInterface!.getAccessTokenSilently({
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
      const token = await this.coreClient.auth.contextInterface!.getAccessTokenWithPopup({
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
  }
}

export default TokenManager;
