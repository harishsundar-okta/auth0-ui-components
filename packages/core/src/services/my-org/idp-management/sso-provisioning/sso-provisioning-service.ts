import { get, post, del } from '@core/api';

import type { IdpId } from '../sso-provider/sso-provider-types';

import type {
  GetIdPProvisioningConfigResponseContent,
  CreateIdPProvisioningConfigResponseContent,
  CreateIdpProvisioningScimTokenResponseContent,
  ListIdpProvisioningScimTokensResponseContent,
  CreateIdpProvisioningScimTokenRequestContent,
} from './sso-provisioning-types';

export async function getProvisioningConfig(
  baseUrl: string,
  idpId: IdpId,
): Promise<GetIdPProvisioningConfigResponseContent> {
  return get(`${baseUrl}my-org/identity-providers/${idpId}/provisioning`);
}

export async function createProvisioningConfig(
  baseUrl: string,
  idpId: IdpId,
): Promise<CreateIdPProvisioningConfigResponseContent> {
  return post(`${baseUrl}my-org/identity-providers/${idpId}/provisioning`, {});
}

export async function deleteProvisioningConfig(baseUrl: string, idpId: IdpId): Promise<void> {
  return del(`${baseUrl}my-org/identity-providers/${idpId}/provisioning`);
}

export async function listScimTokens(
  baseUrl: string,
  idpId: IdpId,
): Promise<ListIdpProvisioningScimTokensResponseContent> {
  return get(`${baseUrl}my-org/identity-providers/${idpId}/provisioning/scim-tokens`);
}

export async function createScimToken(
  baseUrl: string,
  idpId: IdpId,
  data: CreateIdpProvisioningScimTokenRequestContent,
): Promise<CreateIdpProvisioningScimTokenResponseContent> {
  return post(`${baseUrl}my-org/identity-providers/${idpId}/provisioning/scim-tokens`, data);
}

export async function deleteScimToken(
  baseUrl: string,
  idpId: IdpId,
  idpScimTokenId?: string,
): Promise<void> {
  return del(
    `${baseUrl}my-org/identity-providers/${idpId}/provisioning/scim-tokens/${idpScimTokenId}`,
  );
}
