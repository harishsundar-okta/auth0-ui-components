import type { BaseCoreClientInterface, MyOrgAPIServiceInterface } from '@core/auth/auth-types';
import type { MyOrgClientOptions } from 'auth0-myorg-sdk';
import { MyOrgClient } from 'auth0-myorg-sdk';

import { MY_ORG_SCOPES } from './my-org-api-constants';
import { createOrganizationDetailsController } from './org-management';

/**
 * Creates a configured MyOrgClient instance using user-based authentication
 */
async function createMyOrgClient(coreClient: BaseCoreClientInterface): Promise<MyOrgClient> {
  const audiencePath = 'my-org';
  const token = await coreClient.getToken(MY_ORG_SCOPES, audiencePath);

  const clientOptions: MyOrgClientOptions = {
    domain: coreClient.auth.domain,
    token: token || '',
  };

  return new MyOrgClient(clientOptions);
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
  };
}
