import type {
  SsoProvideDeleteMessages,
  SsoProviderDeleteModalContentMessages,
} from './sso-provider-delete-types';

export interface SsoProviderTableMessages {
  header: {
    title?: string;
    description?: string;
    create_button_text?: string;
  };
  table: {
    empty_message?: string;
    columns: {
      name?: string;
      identity_provider?: string;
      display_name?: string;
    };
    actions?: {
      edit_button_text?: string;
      delete_button_text?: string;
      remove_button_text?: string;
    };
  };
  create_consent_modal: {
    title?: string;
    description?: string;
    actions?: {
      cancel_button_text?: string;
      process_button_text?: string;
    };
  };
  delete_modal: SsoProvideDeleteMessages;
  remove_modal: {
    title?: string;
    description?: string;
    model_content?: SsoProviderDeleteModalContentMessages;
    actions?: {
      cancel_button_text?: string;
      remove_button_text?: string;
    };
  };
  notifications: {
    delete_success?: string;
    remove_success?: string;
    general_error?: string;
  };
}
