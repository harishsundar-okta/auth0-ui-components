import type { BaseCoreClientInterface } from '@core/auth/auth-types';
import type { MyOrgClient } from 'auth0-myorg-sdk';

import type {
  ListIdentityProvidersResponseContent,
  DetachIdpProviderResponseContent,
  UpdateIdentityProviderRequestContent,
  UpdateIdentityProviderResponseContent,
} from './idp-types';
import {
  getIdentityProviders,
  deleteIdentityProvider,
  detachIdentityProvider,
  updateIdentityProvider,
} from './sso-provider-service';

export interface IdentityProvidersController {
  list(): Promise<ListIdentityProvidersResponseContent>;
  delete(idpId: string): Promise<void>;
  detach(idpId: string): Promise<DetachIdpProviderResponseContent>;
  update(
    idpId: string,
    data: UpdateIdentityProviderRequestContent,
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

    update: (idpId: string, data: UpdateIdentityProviderRequestContent) =>
      delegateCall(
        () => updateIdentityProvider(coreClient.getApiBaseUrl(), idpId, data),
        () => myOrgClient!.organization.identityProviders.update(idpId, data),
      ),
  };
}
