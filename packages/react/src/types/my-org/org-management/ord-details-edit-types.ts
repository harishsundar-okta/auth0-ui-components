import type {
  OrgEditCustomMessages,
  SharedComponentProps,
  OrganizationDetailSchemaValidation,
  OrganizationDetailFormValues,
} from '@auth0-web-ui-components/core';
import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import type { OrgDeleteClasses } from './org-delete-types';
import type { OrgDetailsClasses, OrgDetailsFormActions } from './org-details-types';

export interface OrgEditClasses extends OrgDetailsClasses, OrgDeleteClasses {}

export interface OrgEditSaveAction {
  label?: string;
  disable?: boolean;
  className?: string;
  onBefore?: (org: OrganizationDetailFormValues & { id: string }) => boolean;
  onAfter?: (org: OrganizationDetailFormValues & { id: string }) => void;
}

export interface OrgEditDeleteAction {
  label?: string;
  disable?: boolean;
  className?: string;
  onBefore?: (org: OrganizationDetailFormValues & { id: string }) => boolean;
  onAfter?: (org: OrganizationDetailFormValues & { id: string }) => void;
}

export interface OrgEditFormActions extends OrgDetailsFormActions {
  saveAction?: OrgEditSaveAction;
  deleteAction?: OrgEditDeleteAction;
  cancelAction?: {
    label?: string;
    onClick?: (event?: Event) => void;
  };
  showCancel?: boolean;
}

export interface OrgEditBackButton {
  text?: string;
  icon?: LucideIcon;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface OrgDetailsEditProps
  extends SharedComponentProps<
    OrgEditCustomMessages,
    OrgEditClasses,
    OrganizationDetailSchemaValidation
  > {
  organizationId: string;
  isLoading?: boolean;
  formActions: OrgEditFormActions;
  readOnly?: boolean;
  hideHeader?: boolean;
  backButton?: OrgEditBackButton;
}
