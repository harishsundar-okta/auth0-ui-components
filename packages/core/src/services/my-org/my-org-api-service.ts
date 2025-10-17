import type { BaseCoreClientInterface, MyOrgAPIServiceInterface } from '@core/auth/auth-types';
import { MyOrgClient } from 'auth0-myorg-sdk';

import { createIdentityProvidersController } from './idp-management';
import { MY_ORG_SCOPES } from './my-org-api-constants';
import { createOrganizationDetailsController } from './org-management';

/**
 * Creates a configured MyOrgClient instance using user-based authentication
 */
async function createMyOrgClient(coreClient: BaseCoreClientInterface): Promise<MyOrgClient> {
  const { domain } = coreClient.auth;
  const token = await coreClient.getToken(MY_ORG_SCOPES, 'my-org');

  if (!domain?.trim() || !token?.trim()) {
    throw new Error('Invalid or missing domain/token for MyOrg API client');
  }

  return new MyOrgClient({
    domain: domain.trim(),
    token: token.trim(),
  });
}

/**
 * Creates an MyOrg API service instance with access to the different MyOrg operations.
 */
export async function createMyOrgAPIService(
  coreClient: BaseCoreClientInterface,
): Promise<MyOrgAPIServiceInterface> {
  let myOrgClient: MyOrgClient | undefined;

  if (!coreClient.isProxyMode()) {
    myOrgClient = await createMyOrgClient(coreClient);
  }
  return {
    organizationDetails: createOrganizationDetailsController(coreClient, myOrgClient),
    organization: {
      identityProviders: createIdentityProvidersController(coreClient, myOrgClient),
    },
  };
}
