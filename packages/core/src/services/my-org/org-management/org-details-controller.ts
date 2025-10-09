import type { BaseCoreClientInterface } from '@core/auth/auth-types';
import type { MyOrgClient } from 'auth0-myorg-sdk';

import type { OrganizationPrivate } from '../../../services';

import { OrgDetailsMappers } from './org-details-mappers';
import { getOrgDetails, updateOrgDetails } from './org-details-service';

export interface OrganizationDetailsControllerInterface {
  get(): Promise<OrganizationPrivate>;
  update(data: OrganizationPrivate): Promise<OrganizationPrivate>;
}

const OrganizationDetailsUtils = {
  /**
   * Fetches organization details.
   */
  async get(
    coreClient: BaseCoreClientInterface,
    myOrgClient?: MyOrgClient,
  ): Promise<OrganizationPrivate> {
    if (!coreClient.isProxyMode()) {
      if (!myOrgClient) {
        throw new Error('MyOrgClient is required for non-proxy mode');
      }
      const response = await myOrgClient.organizationDetails.get();
      return OrgDetailsMappers.fromAPI(response);
    }
    const baseUrl = coreClient.getApiBaseUrl();
    return getOrgDetails(baseUrl);
  },

  /**
   * Updates organization details.
   */
  async update(
    coreClient: BaseCoreClientInterface,
    formData: OrganizationPrivate,
    myOrgClient?: MyOrgClient,
  ): Promise<OrganizationPrivate> {
    if (!coreClient.isProxyMode()) {
      if (!myOrgClient) {
        throw new Error('MyOrgClient is required for non-proxy mode');
      }
      const updateData = OrgDetailsMappers.toAPI(formData);
      const response = await myOrgClient.organizationDetails.update(updateData);
      return OrgDetailsMappers.fromAPI(response);
    }

    const baseUrl = coreClient.getApiBaseUrl();
    return updateOrgDetails(baseUrl, formData);
  },
};

/**
 * Creates an organization controller instance.
 */
export function createOrganizationDetailsController(
  coreClient: BaseCoreClientInterface,
  myOrgClient?: MyOrgClient,
): OrganizationDetailsControllerInterface {
  return {
    get: () => OrganizationDetailsUtils.get(coreClient, myOrgClient),
    update: (data) => OrganizationDetailsUtils.update(coreClient, data, myOrgClient),
  };
}
