import type {
  ProviderConfigureFieldsMessages,
  ProviderDetailsMessages,
} from './sso-provider-create-types';
import type {
  SsoProvideDeleteMessages,
  SsoProvideRemoveMessages,
} from './sso-provider-delete-types';

export interface SsoProvideEditMessages {
  header?: {
    back_button_text?: string;
  };
  tabs?: {
    sso?: {
      name?: string;
      content?: SsoProviderTabMessages;
    };
    provisioning?: {
      name?: string;
    };
    domains?: {
      name?: string;
    };
  };
}

export interface SsoProviderTabMessages {
  alert?: {
    warning: string;
    error: string;
  };
  delete?: SsoProvideDeleteMessages;
  remove?: SsoProvideRemoveMessages;
  details?: SsoProviderDetailsMessages;
}

export interface SsoProviderDetailsMessages {
  submit_button_label?: string;
  unsaved_changes_text?: string;
  details_fields?: ProviderDetailsMessages;
  configure_fields?: ProviderConfigureFieldsMessages;
}
