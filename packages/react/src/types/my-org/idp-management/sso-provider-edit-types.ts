import type {
  SharedComponentProps,
  BackButton,
  SsoProvideEditMessages,
  IdentityProvider,
  IdpId,
  OrganizationPrivate,
  ComponentAction,
  UpdateIdentityProviderRequestContentPrivate,
  SsoProviderTabMessages,
  SsoProviderDetailsMessages,
} from '@auth0-web-ui-components/core';
import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import type { FormActionsProps } from '../../../components/ui/form-actions';

import type { SsoProviderCreateClasses } from './sso-provider-create-types';
import type {
  SsoProviderDeleteClasses,
  SsoProviderRemoveClasses,
} from './sso-provider-delete-types';

export interface SsoProviderEditBackButton extends Omit<BackButton, 'onClick'> {
  icon?: LucideIcon;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SsoProviderEditClasses extends SsoProviderTabClasses {
  'SsoProviderEdit-header'?: string;
  'SsoProviderEdit-tabs'?: string;
}

export interface SsoProviderEditProps
  extends SharedComponentProps<SsoProvideEditMessages, SsoProviderEditClasses> {
  idpId: IdpId;
  backButton?: SsoProviderEditBackButton;
  update?: ComponentAction<IdentityProvider, IdentityProvider>;
  delete: ComponentAction<IdentityProvider, void>;
  removeFromOrg: ComponentAction<IdentityProvider, void>;
}

export interface UseSsoProviderEditOptions extends SharedComponentProps {
  update?: ComponentAction<IdentityProvider, IdentityProvider>;
  deleteAction: ComponentAction<IdentityProvider, void>;
  removeFromOrg: ComponentAction<IdentityProvider, void>;
}

export interface UseSsoProviderEditReturn {
  provider: IdentityProvider | null;
  organization: OrganizationPrivate | null;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isRemoving: boolean;
  fetchProvider: () => Promise<IdentityProvider | null>;
  fetchOrganizationDetails: () => Promise<void>;
  updateProvider: (data: UpdateIdentityProviderRequestContentPrivate) => Promise<void>;
  onDeleteConfirm: () => Promise<void>;
  onRemoveConfirm: () => Promise<void>;
}

export interface SsoProviderTabClasses extends SsoProviderDeleteClasses, SsoProviderRemoveClasses {
  'ProviderDetails-root'?: string;
  'ProviderConfigure-root'?: string;
  'SsoProviderDetails-formActions'?: string;
}

export interface SsoProviderDetailsFormActions extends Omit<FormActionsProps, 'nextAction'> {
  nextAction?: {
    disabled: boolean;
    onClick?: (data: UpdateIdentityProviderRequestContentPrivate) => Promise<void>;
  };
}

export interface SsoProviderTabProps
  extends SharedComponentProps<SsoProviderTabMessages, SsoProviderTabClasses> {
  formActions: SsoProviderDetailsFormActions;
  provider: IdentityProvider | null;
  onDelete: (provider: IdentityProvider) => Promise<void>;
  onRemove: (provider: IdentityProvider) => Promise<void>;
  organization: OrganizationPrivate | null;
  isDeleting: boolean;
  isRemoving: boolean;
}

export interface ProviderDetailsClasses
  extends Omit<
    SsoProviderCreateClasses,
    'SsoProviderCreate-header' | 'SsoProviderCreate-wizard' | 'ProviderSelect-root'
  > {}

export interface ProviderConfigureFieldsClasses
  extends Omit<
    SsoProviderCreateClasses,
    'SsoProviderCreate-header' | 'SsoProviderCreate-wizard' | 'ProviderSelect-root'
  > {}

export interface SsoProviderDetailsClasses extends SsoProviderTabClasses {
  'SsoProviderDetails-formActions'?: string;
}

export interface SsoProviderDetailsProps
  extends SharedComponentProps<SsoProviderDetailsMessages, SsoProviderDetailsClasses> {
  provider: IdentityProvider;
  readOnly?: boolean;
  formActions?: SsoProviderDetailsFormActions;
}
