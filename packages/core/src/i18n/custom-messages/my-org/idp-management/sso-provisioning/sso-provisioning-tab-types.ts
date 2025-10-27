import type { SsoProviderNotificationMessages } from '../sso-provider/sso-provider-edit-types';

import type { ProvisioningManageTokenMessages } from './provisioning-manage-token-types';

export interface SsoProvisioningTabMessages {
  header?: {
    title?: string;
    description?: string;
    guided_setup_button_label?: string;
  };
  warning_alert_message?: {
    title?: string;
    description?: string;
  };
  save_button_label?: string;
  notifications?: SsoProviderNotificationMessages;
  details?: SsoProvisioningDetailsMessages;
  delete?: SsoProvisioningDeleteMessages;
}

export interface SsoProvisioningDetailsMessages {
  manage_tokens?: ProvisioningManageTokenMessages;
  save_button_label?: string;
  fields?: {
    user_id_attribute?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    scim_endpoint_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };
}

export interface SsoProvisioningDeleteModalContentMessages {
  description?: string;
}

export interface SsoProvisioningDeleteMessages {
  modal?: {
    title?: string;
    content: SsoProvisioningDeleteModalContentMessages;
    actions?: {
      cancel_button_label?: string;
      delete_button_label?: string;
    };
  };
}
