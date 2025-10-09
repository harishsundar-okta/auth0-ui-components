import { get, patch } from '@core/api';

import { OrgDetailsMappers } from './org-details-mappers';
import type {
  OrganizationPrivate,
  GetOrganizationDetailsResponseContent,
} from './org-details-types';

export async function getOrgDetails(baseUrl: string): Promise<OrganizationPrivate> {
  const response = await get(`${baseUrl}my-org/details`);
  return OrgDetailsMappers.fromAPI(response as GetOrganizationDetailsResponseContent);
}

export async function updateOrgDetails(
  baseUrl: string,
  formData: OrganizationPrivate,
): Promise<OrganizationPrivate> {
  const apiData = OrgDetailsMappers.toAPI(formData);
  const response = await patch(`${baseUrl}my-org/details`, apiData);
  return OrgDetailsMappers.fromAPI(response as GetOrganizationDetailsResponseContent);
}
