import type { Auth0MyOrg } from 'auth0-myorg-sdk';

export type CreateIdentityProviderRequestContent = Auth0MyOrg.CreateIdentityProviderRequestContent;
export type IdentityProvider = Auth0MyOrg.IdpKnown;

export type IdpStrategy =
  | 'adfs'
  | 'google-apps'
  | 'oidc'
  | 'okta'
  | 'ping-federate'
  | 'samlp'
  | 'waad';

export type IdentityProviderCreate = Omit<IdentityProvider, 'id'>;

type Method = 'scim' | 'google-sync';

export interface ProvisioningField {
  provisioning_field: string;
  user_attribute: string;
  description: string;
  label: string;
}

export interface Provisioning {
  identity_provider_id: string;
  identity_provider_name: string;
  strategy: IdpStrategy;
  method: Method;
  fields: ProvisioningField[];
  updated_on: string;
  created_at: string;
  user_id_attribute: string;
}

export interface SCIMTokenCreate {
  token_lifetime?: number;
}

export interface SCIMToken {
  token_id: string;
  token: string;
  created_at: string;
  valid_until?: string;
}

type DomainStatus = 'pending' | 'failed' | 'verified';

export interface DomainCreate {
  domain: string;
}

export interface Domain {
  id: string;
  org_id: string;
  domain: string;
  status: DomainStatus;
  verification_txt: string;
  verification_host: string;
}
