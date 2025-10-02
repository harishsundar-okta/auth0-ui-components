import type { MyOrgClient } from 'auth0-myorg-sdk';

import type { OrganizationDetailFormValues } from '../../../schemas';

import { transformToFormValues, transformFromFormValues } from './org-details-utils';

export interface OrganizationDetailsControllerInterface {
  get(): Promise<OrganizationDetailFormValues>;
  update(data: OrganizationDetailFormValues): Promise<OrganizationDetailFormValues>;
}

const OrganizationDetailsUtils = {
  /**
   * Fetches organization details.
   */
  async get(myOrgClient: MyOrgClient): Promise<OrganizationDetailFormValues> {
    const response = await myOrgClient.organizationDetails.get();
    return transformToFormValues(response);
  },

  /**
   * Updates organization details.
   */
  async update(
    myOrgClient: MyOrgClient,
    formData: OrganizationDetailFormValues,
  ): Promise<OrganizationDetailFormValues> {
    const updateData = transformFromFormValues(formData);
    const response = await myOrgClient.organizationDetails.update(updateData);
    return transformToFormValues(response);
  },
};

/**
 * Creates an organization controller instance.
 */
export function createOrganizationDetailsController(
  myOrgClient: MyOrgClient,
): OrganizationDetailsControllerInterface {
  return {
    get: () => OrganizationDetailsUtils.get(myOrgClient),
    update: (data) => OrganizationDetailsUtils.update(myOrgClient, data),
  };
}
