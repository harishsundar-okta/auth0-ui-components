import { get, del, post, patch } from '@core/api';

import type {
  ListIdentityProvidersResponseContent,
  DetachIdpProviderResponseContent,
  CreateIdentityProviderRequestContent,
  CreateIdentityProviderResponseContent,
  IdpId,
  GetIdentityProviderResponseContent,
  UpdateIdentityProviderRequestContent,
  UpdateIdentityProviderResponseContent,
} from '../idp-types';

export async function getIdentityProviders(
  baseUrl: string,
): Promise<ListIdentityProvidersResponseContent> {
  return get(`${baseUrl}my-org/identity-providers`);
}

export async function createIdentityProvider(
  baseUrl: string,
  provider: CreateIdentityProviderRequestContent,
): Promise<CreateIdentityProviderResponseContent> {
  return post(`${baseUrl}my-org/identity-providers`, provider);
}

export async function updateIdentityProvider(
  baseUrl: string,
  idpId: IdpId,
  provider: UpdateIdentityProviderRequestContent,
): Promise<UpdateIdentityProviderResponseContent> {
  return patch(`${baseUrl}my-org/identity-providers/${idpId}`, provider);
}

export async function deleteIdentityProvider(baseUrl: string, idpId: IdpId): Promise<void> {
  return del(`${baseUrl}my-org/identity-providers/${idpId}`);
}

export async function detachIdentityProvider(
  baseUrl: string,
  idpId: string,
): Promise<DetachIdpProviderResponseContent> {
  return post(`${baseUrl}my-org/identity-providers/${idpId}/detach`, undefined);
}

export async function getIdentityProvider(
  baseUrl: string,
  idpId: IdpId,
): Promise<GetIdentityProviderResponseContent> {
  return get(`${baseUrl}my-org/identity-providers/${idpId}`);
}
