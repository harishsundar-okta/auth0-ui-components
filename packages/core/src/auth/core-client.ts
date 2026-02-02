import { initializeMyAccountClient } from '@core/services/my-account/my-account-api-service';
import { initializeMyOrganizationClient } from '@core/services/my-organization/my-organization-api-service';

import type { I18nInitOptions } from '../i18n';
import { createI18nService } from '../i18n';

import type { AuthDetails, CoreClientInterface } from './auth-types';
import { createTokenManager } from './token-manager';

export async function createCoreClient(
  authDetails: AuthDetails,
  i18nOptions?: I18nInitOptions,
): Promise<CoreClientInterface> {
  const i18nService = await createI18nService(
    i18nOptions || { currentLanguage: 'en-US', fallbackLanguage: 'en-US' },
  );

  const tokenManagerService = createTokenManager(authDetails);

  const { client: myOrgApi, setLatestScopes: setOrgScopes } = initializeMyOrganizationClient(
    authDetails,
    tokenManagerService,
  );

  const { client: myAccApi, setLatestScopes: setAccountScopes } = initializeMyAccountClient(
    authDetails,
    tokenManagerService,
  );

  return {
    auth: authDetails,
    i18nService,
    myAccountApiClient: myAccApi,
    myOrganizationApiClient: myOrgApi,

    getToken: (scope, aud, ignoreCache) => tokenManagerService.getToken(scope, aud, ignoreCache),
    isProxyMode: () => !!authDetails.authProxyUrl,

    ensureScopes: async (requiredScopes: string, audiencePath: string) => {
      if (audiencePath === 'my-org') setOrgScopes(requiredScopes);
      if (audiencePath === 'me') setAccountScopes(requiredScopes);

      if (authDetails.authProxyUrl) {
        return;
      }

      const config = await authDetails.contextInterface?.getConfiguration();

      if (!config?.domain) {
        throw new Error('Authentication domain is missing.');
      }

      const token = await tokenManagerService.getToken(requiredScopes, audiencePath, true);
      if (!token) {
        throw new Error(`Failed to retrieve token for audience: ${audiencePath}`);
      }
    },

    getMyAccountApiClient: () => {
      if (!myAccApi) throw new Error('myAccountApiClient not initialized.');
      return myAccApi;
    },

    getMyOrganizationApiClient: () => {
      if (!myOrgApi) throw new Error('myOrganizationApiClient not initialized.');
      return myOrgApi;
    },
  };
}
