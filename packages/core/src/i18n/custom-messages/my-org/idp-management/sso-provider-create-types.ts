/**
 * Interface for SSO Provider Select messages that can be used in the UI.
 */
export interface ProviderSelectMessages {
  title?: string;
  description?: string;
}

export interface ProviderDetailsMessages {
  title?: string;
  description?: string;
  fields?: {
    name?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    display_name?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };
}

/**
 * Interface for provider configuration field messages
 */
export interface ProviderConfigureFieldsMessages {
  okta?: {
    domain?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_id?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_secret?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    icon_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  adfs?: {
    adfs_server?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    fedMetadataXml?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  google_apps?: {
    domain?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_id?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_secret?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    icon_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  oidc?: {
    type?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_id?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_secret?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    discovery_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  ping_federate?: {
    signatureAlgorithm?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    digestAlgorithm?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    signSAMLRequest?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    metadataUrl?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    cert?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    signingCert?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    idpInitiated?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    icon_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  samlp?: {
    signatureAlgorithm?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    digestAlgorithm?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    protocolBinding?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    signSAMLRequest?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    bindingMethod?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    metadataUrl?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    cert?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    idpInitiated?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    icon_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };

  waad?: {
    domain?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_id?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    client_secret?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
    icon_url?: {
      label?: string;
      placeholder?: string;
      helper_text?: string;
      error?: string;
    };
  };
}

/**
 * Interface for provider configuration messages
 */
export interface ProviderConfigureMessages {
  title?: string;
  description?: string;
  guided_setup_button_text?: string;
  fields?: ProviderConfigureFieldsMessages;
}
