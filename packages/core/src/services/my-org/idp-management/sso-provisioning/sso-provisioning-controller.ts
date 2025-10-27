import type { BaseCoreClientInterface } from '@core/auth/auth-types';
import type { MyOrgClient } from 'auth0-myorg-sdk';

import type { IdpId } from '../sso-provider/sso-provider-types';
import {
  getProvisioningConfig,
  createProvisioningConfig,
  deleteProvisioningConfig,
  listScimTokens,
  createScimToken,
  deleteScimToken,
} from '../sso-provisioning/sso-provisioning-service';
import type {
  GetIdPProvisioningConfigResponseContent,
  CreateIdPProvisioningConfigResponseContent,
  CreateIdpProvisioningScimTokenRequestContent,
  CreateIdpProvisioningScimTokenResponseContent,
  ListIdpProvisioningScimTokensResponseContent,
} from '../sso-provisioning/sso-provisioning-types';

export interface ProvisioningController {
  get(idpId: IdpId): Promise<GetIdPProvisioningConfigResponseContent>;
  create(idpId: IdpId): Promise<CreateIdPProvisioningConfigResponseContent>;
  delete(idpId: IdpId): Promise<void>;
  listScimTokens(idpId: IdpId): Promise<ListIdpProvisioningScimTokensResponseContent>;
  createScimToken(
    idpId: IdpId,
    data: CreateIdpProvisioningScimTokenRequestContent,
  ): Promise<CreateIdpProvisioningScimTokenResponseContent>;
  deleteScimToken(idpId: IdpId, idpScimTokenId: string): Promise<void>;
}

export function createProvisioningController(
  coreClient: BaseCoreClientInterface,
  myOrgClient: MyOrgClient | undefined,
  delegateCall: <T>(proxyFn: () => Promise<T>, sdkFn: () => Promise<T>) => Promise<T>,
): ProvisioningController {
  return {
    get: (idpId: IdpId) =>
      delegateCall(
        () => getProvisioningConfig(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.provisioning.get(idpId),
      ),

    create: (idpId: IdpId) =>
      delegateCall(
        () => createProvisioningConfig(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.provisioning.create(idpId),
      ),

    delete: (idpId: IdpId) =>
      delegateCall(
        () => deleteProvisioningConfig(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.provisioning.delete(idpId),
      ),

    listScimTokens: (idpId: IdpId) =>
      delegateCall(
        () => listScimTokens(coreClient.getApiBaseUrl(), idpId),
        () => myOrgClient!.organization.identityProviders.provisioning.scimTokens.list(idpId),
      ),

    createScimToken: (idpId: IdpId, data: CreateIdpProvisioningScimTokenRequestContent) =>
      delegateCall(
        () => createScimToken(coreClient.getApiBaseUrl(), idpId, data),
        () =>
          myOrgClient!.organization.identityProviders.provisioning.scimTokens.create(idpId, data),
      ),

    deleteScimToken: (idpId: IdpId, idpScimTokenId: string) =>
      delegateCall(
        () => deleteScimToken(coreClient.getApiBaseUrl(), idpId, idpScimTokenId),
        () =>
          myOrgClient!.organization.identityProviders.provisioning.scimTokens.delete(
            idpId,
            idpScimTokenId,
          ),
      ),
  };
}
