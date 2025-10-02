import type { MyOrgClientOptions } from 'auth0-myorg-sdk';
import { MyOrgClient } from 'auth0-myorg-sdk';

import type { BaseCoreClientInterface, MyOrgAPIServiceInterface } from '../auth/auth-types';

import { MY_ORG_SCOPES } from './my-org/my-org-api-constants';
import { createOrganizationDetailsController } from './my-org/org-management/org-details-controller';

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
  const myOrgClient = await createMyOrgClient(coreClient);
  return {
    organizationDetails: createOrganizationDetailsController(myOrgClient),
  };
}
