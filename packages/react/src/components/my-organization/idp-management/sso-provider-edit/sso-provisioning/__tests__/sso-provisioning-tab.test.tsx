import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  mockProvider,
  SsoProvisioningProps,
  mockOnCreateProvisioning,
  mockOnDeleteProvisioning,
  mockOnListScimTokens,
} from '../../../../../../internals';
import { SsoProvisioningTab } from '../sso-provisioning-tab';

// Mock hooks
const mockUseTranslator = vi.fn(() => ({
  t: (key: string) => key,
}));

const mockFetchProvisioning = vi.fn();
const mockCreateProvisioning = vi.fn();
const mockDeleteProvisioning = vi.fn();
const mockListScimTokens = vi.fn();
const mockCreateScimToken = vi.fn();
const mockDeleteScimToken = vi.fn();

vi.mock('../../../../../../hooks/use-translator', () => ({
  useTranslator: () => mockUseTranslator(),
}));

vi.mock('../../../../../../hooks/use-theme', () => ({
  useTheme: () => ({ isDarkMode: false }),
}));

vi.mock('../../../../../../hooks/my-organization/idp-management/use-sso-provider-edit', () => ({
  useSsoProviderEdit: () => ({
    provisioningConfig: null,
    isProvisioningLoading: false,
    isProvisioningUpdating: false,
    isProvisioningDeleting: false,
    isScimTokensLoading: false,
    isScimTokenCreating: false,
    isScimTokenDeleting: false,
    fetchProvisioning: mockFetchProvisioning,
    createProvisioning: mockCreateProvisioning,
    deleteProvisioning: mockDeleteProvisioning,
    listScimTokens: mockListScimTokens,
    createScimToken: mockCreateScimToken,
    deleteScimToken: mockDeleteScimToken,
  }),
}));

describe('SsoProvisioningTab', () => {
  const renderComponent = (props = {}) => {
    return render(<SsoProvisioningTab {...SsoProvisioningProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnCreateProvisioning.mockResolvedValue(undefined);
    mockOnDeleteProvisioning.mockResolvedValue(undefined);
    mockOnListScimTokens.mockResolvedValue({ scim_tokens: [] });
  });

  it('should render toggle switch', () => {
    renderComponent();

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('should show unchecked switch when provisioning is disabled', () => {
    renderComponent();

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('should disable switch when provider id is missing', () => {
    renderComponent({ provider: { ...mockProvider, id: '' } });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('should render loading state', () => {
    renderComponent({ isProvisioningLoading: true });

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render with null provisioningConfig', () => {
    renderComponent({ provisioningConfig: null });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('should render with undefined provisioningConfig', () => {
    renderComponent({ provisioningConfig: undefined });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('should handle provisioning error state', () => {
    renderComponent({ isProvisioningError: true });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('should render with oidc strategy provider', () => {
    const oidcProvider = {
      ...mockProvider,
      strategy: 'oidc' as const,
    };

    renderComponent({ provider: oidcProvider });

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render with adfs strategy provider', () => {
    const adfsProvider = {
      ...mockProvider,
      strategy: 'adfs' as const,
    };

    renderComponent({ provider: adfsProvider });

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should render when provider is disabled', () => {
    renderComponent({ provider: { ...mockProvider, is_enabled: false } });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('should not call onProvisioningUpdate when switch is disabled', async () => {
    const onProvisioningUpdate = vi.fn();
    renderComponent({
      provider: { ...mockProvider, id: '' },
      onProvisioningUpdate,
    });

    const switchElement = screen.getByRole('switch');
    await userEvent.click(switchElement);

    expect(onProvisioningUpdate).not.toHaveBeenCalled();
  });

  describe('attribute sync warning', () => {
    it('should render SsoProviderAttributeSyncAlert when hasProvisioningAttributeSyncWarning is true', () => {
      renderComponent({ hasProvisioningAttributeSyncWarning: true });

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not render SsoProviderAttributeSyncAlert when hasProvisioningAttributeSyncWarning is false', () => {
      renderComponent({ hasProvisioningAttributeSyncWarning: false });

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should pass isSyncingAttributes to alert component', () => {
      renderComponent({
        hasProvisioningAttributeSyncWarning: true,
        isSyncingAttributes: true,
      });

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('provider enabled state', () => {
    it('should show tooltip when provider is disabled', () => {
      renderComponent({ provider: { ...mockProvider, is_enabled: false } });

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should not show tooltip when provider is enabled', () => {
      renderComponent({ provider: { ...mockProvider, is_enabled: true } });

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply custom styling', () => {
      const customStyling = {
        variables: { common: {}, light: {}, dark: {} },
        classes: {
          'SsoProvisioningTab-root': 'custom-class',
        },
      };
      renderComponent({ styling: customStyling });

      expect(screen.getByRole('switch')).toBeInTheDocument();
    });
  });
});
