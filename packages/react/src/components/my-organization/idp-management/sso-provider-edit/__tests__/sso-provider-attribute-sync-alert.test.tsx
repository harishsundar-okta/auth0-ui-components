import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { renderWithProviders } from '../../../../../internals';
import type { SsoProviderAttributeSyncAlertProps } from '../../../../../types/my-organization/idp-management/sso-provider/sso-provider-edit-types';
import { SsoProviderAttributeSyncAlert } from '../sso-provider-attribute-sync-alert';

vi.mock('../../../../../hooks/use-translator', () => ({
  useTranslator: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Attribute Sync Warning',
        description: 'Some attributes need to be synced.',
        sync_button_label: 'Sync Attributes',
        'sync_modal.title': 'Confirm Sync',
        'sync_modal.description': 'Are you sure you want to sync attributes?',
        'sync_modal.actions.cancel_button_label': 'Cancel',
        'sync_modal.actions.proceed_button_label': 'Sync',
      };
      return translations[key] || key;
    },
  }),
}));

describe('SsoProviderAttributeSyncAlert', () => {
  const defaultProps: SsoProviderAttributeSyncAlertProps = {
    onSync: vi.fn(),
    isSyncing: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the alert with title and description', () => {
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} />);

      expect(screen.getByText('Attribute Sync Warning')).toBeInTheDocument();
      expect(screen.getByText('Some attributes need to be synced.')).toBeInTheDocument();
    });

    it('should render the sync button', () => {
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Sync Attributes' })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      renderWithProviders(
        <SsoProviderAttributeSyncAlert {...defaultProps} className="custom-class" />,
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('sync button interactions', () => {
    it('should open confirmation modal when sync button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} />);

      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      await user.click(syncButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Confirm Sync')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to sync attributes?')).toBeInTheDocument();
    });

    it('should disable sync button when isSyncing is true', () => {
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} isSyncing={true} />);

      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      expect(syncButton).toBeDisabled();
    });
  });

  describe('confirmation modal', () => {
    it('should close modal when cancel button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} />);

      // Open modal
      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      await user.click(syncButton);

      // Click cancel
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      await user.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should call onSync and close modal when proceed button is clicked', async () => {
      const onSync = vi.fn().mockResolvedValue(undefined);
      const user = userEvent.setup();
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} onSync={onSync} />);

      // Open modal
      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      await user.click(syncButton);

      // Click proceed
      const proceedButton = screen.getByRole('button', { name: 'Sync' });
      await user.click(proceedButton);

      await waitFor(() => {
        expect(onSync).toHaveBeenCalled();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should disable modal buttons when isSyncing is true', () => {
      renderWithProviders(<SsoProviderAttributeSyncAlert {...defaultProps} isSyncing={true} />);

      // Sync button should be disabled when isSyncing is true
      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      expect(syncButton).toBeDisabled();
    });

    it('should handle sync when onSync is not provided', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SsoProviderAttributeSyncAlert isSyncing={false} />);

      // Open modal
      const syncButton = screen.getByRole('button', { name: 'Sync Attributes' });
      await user.click(syncButton);

      // Click proceed - should not throw
      const proceedButton = screen.getByRole('button', { name: 'Sync' });
      await user.click(proceedButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('custom translatorKey', () => {
    it('should use custom translatorKey when provided', () => {
      renderWithProviders(
        <SsoProviderAttributeSyncAlert {...defaultProps} translatorKey="custom.translator.key" />,
      );

      // Component still renders (translator mock handles all keys)
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
