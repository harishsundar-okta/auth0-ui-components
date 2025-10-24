import type { Domain, DomainConfigureMessages } from '@auth0-web-ui-components/core';

import type { IdentityProvider } from '../..';

export interface DomainConfigureProvidersModalProps {
  className?: string;
  customMessages?: Partial<DomainConfigureMessages>;
  isOpen: boolean;
  isLoading: boolean;
  domain: Domain | null;
  providers: IdentityProvider[];
  onClose: () => void;
  // Enable/disable for selected provider
  onToggleSwitch: (domain: Domain, provider: IdentityProvider, enable: boolean) => void;
  // Open selected provider
  onOpenProvider?: (provider: IdentityProvider) => void;
  // Open create provider wizard
  onCreateProvider?: () => void;
}
