import type { BaseCoreClientInterface } from '@core/auth/auth-types';
import type { MyOrgClient } from 'auth0-myorg-sdk';

import type {
  CreateIdentityProviderRequestContentPrivate,
  ListIdentityProvidersResponseContent,
  DetachIdpProviderResponseContent,
  CreateIdentityProviderRequestContent,
  CreateIdentityProviderResponseContent,
  GetIdentityProviderResponseContent,
  IdpId,
  UpdateIdentityProviderRequestContent,
  UpdateIdentityProviderResponseContent,
  UpdateIdentityProviderRequestContentPrivate,
} from '../idp-types';

import { SsoProviderMappers } from './sso-provider-mappers';
import {
  getIdentityProviders,
  deleteIdentityProvider,
  detachIdentityProvider,
  createIdentityProvider,
  getIdentityProvider,
  updateIdentityProvider,
} from './sso-provider-service';

export interface IdentityProvidersController {
  list(): Promise<ListIdentityProvidersResponseContent>;
  delete(idpId: string): Promise<void>;
  detach(idpId: string): Promise<DetachIdpProviderResponseContent>;
  create(
    provider: CreateIdentityProviderRequestContentPrivate,
  ): Promise<CreateIdentityProviderResponseContent>;
  get(idpId: IdpId): Promise<GetIdentityProviderResponseContent>;
  update(
    idpId: IdpId,
    provider: UpdateIdentityProviderRequestContentPrivate,
  ): Promise<UpdateIdentityProviderResponseContent>;
}

export function createIdentityProvidersController(
  coreClient: BaseCoreClientInterface,
  myOrgClient?: MyOrgClient,
): IdentityProvidersController {
  const isProxy = coreClient.isProxyMode();

  if (!isProxy && !myOrgClient) {
    throw new Error('MyOrgClient is required for non-proxy mode');
  }

  const delegateCall = <T>(proxyFn: () => Promise<T>, sdkFn: () => Promise<T>): Promise<T> =>
    isProxy ? proxyFn() : sdkFn();

  return {
    list: () =>
      delegateCall(
        () => getIdentityProviders(coreClient.getApiBaseUrl()),
        () => myOrgClient!.organization.identityProviders.list(),
      ),

    create: (provider: CreateIdentityProviderRequestContentPrivate) => {
      const { strategy, name, display_name, ...configOptions } = provider;

      const formData = {
        strategy,
        name,
        display_name,
        options: configOptions,
      };

      const apiRequestData: CreateIdentityProviderRequestContent =
        SsoProviderMappers.createToAPI(formData);

      return delegateCall(
        () => createIdentityProvider(coreClient.getApiBaseUrl(), apiRequestData),
        () => myOrgClient!.organization.identityProviders.create(apiRequestData),
      );
    },

    delete: (idpId: string) =>
      delegateCall(
        () => deleteIdentityProvider(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.delete(idpId),
      ),

    detach: (idpId: string) =>
      delegateCall(
        () => detachIdentityProvider(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.detach(idpId),
      ),

    get: (idpId: IdpId) =>
      delegateCall(
        () => getIdentityProvider(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.get(idpId),
      ),

    update: (
      idpId: IdpId,
      provider: UpdateIdentityProviderRequestContentPrivate,
    ): Promise<UpdateIdentityProviderResponseContent> => {
      const apiRequestData: UpdateIdentityProviderRequestContent =
        SsoProviderMappers.updateToAPI(provider);

      return delegateCall(
        () => updateIdentityProvider(coreClient.getApiBaseUrl(), idpId, apiRequestData),
        () => myOrgClient!.organization.identityProviders.update(idpId, apiRequestData),
      );
    },
  };
}
