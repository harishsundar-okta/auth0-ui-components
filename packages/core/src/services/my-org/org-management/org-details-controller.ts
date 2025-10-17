import type { BaseCoreClientInterface } from '@core/auth/auth-types';
import type { MyOrgClient } from 'auth0-myorg-sdk';

import type { OrganizationPrivate } from '../../../services';

import { OrgDetailsMappers } from './org-details-mappers';
import { getOrgDetails, updateOrgDetails } from './org-details-service';

export interface OrganizationDetailsController {
  get(): Promise<OrganizationPrivate>;
  update(data: OrganizationPrivate): Promise<OrganizationPrivate>;
}

export function createOrganizationDetailsController(
  coreClient: BaseCoreClientInterface,
  myOrgClient?: MyOrgClient,
): OrganizationDetailsController {
  const isProxy = coreClient.isProxyMode();

  if (!isProxy && !myOrgClient) {
    throw new Error('MyOrgClient is required for non-proxy mode');
  }

  const delegateCall = <T>(proxyFn: () => Promise<T>, sdkFn: () => Promise<T>): Promise<T> =>
    isProxy ? proxyFn() : sdkFn();

  return {
    get: () =>
      delegateCall(
        () => getOrgDetails(coreClient.getApiBaseUrl()),
        async () => {
          const response = await myOrgClient!.organizationDetails.get();
          return OrgDetailsMappers.fromAPI(response);
        },
      ),

    update: (data: OrganizationPrivate) =>
      delegateCall(
        () => updateOrgDetails(coreClient.getApiBaseUrl(), data),
        async () => {
          const updateData = OrgDetailsMappers.toAPI(data);
          const response = await myOrgClient!.organizationDetails.update(updateData);
          return OrgDetailsMappers.fromAPI(response);
        },
      ),
  };
}
