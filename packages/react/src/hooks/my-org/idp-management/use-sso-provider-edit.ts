import {
  OrgDetailsFactory,
  type IdentityProvider,
  type IdpId,
  type OrganizationPrivate,
  type UpdateIdentityProviderRequestContent,
} from '@auth0-web-ui-components/core';
import { useCallback, useState, useEffect } from 'react';

import { showToast } from '../../../components/ui/toast';
import type {
  UseSsoProviderEditOptions,
  UseSsoProviderEditReturn,
} from '../../../types/my-org/idp-management/sso-provider-edit-types';
import { useCoreClient } from '../../use-core-client';
import { useTranslator } from '../../use-translator';

export function useSsoProviderEdit(
  idpId: IdpId,
  {
    update,
    deleteAction,
    removeFromOrg,
    customMessages = {},
  }: Partial<UseSsoProviderEditOptions> = {},
): UseSsoProviderEditReturn {
  const { coreClient } = useCoreClient();
  const { t } = useTranslator('idp_management.notifications', customMessages);

  const [provider, setProvider] = useState<IdentityProvider | null>(null);
  const [organization, setOrganization] = useState<OrganizationPrivate>(OrgDetailsFactory.create());
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const fetchProvider = useCallback(async (): Promise<IdentityProvider | null> => {
    if (!coreClient || !idpId) {
      return null;
    }

    try {
      setIsLoading(true);
      const response = await coreClient
        .getMyOrgApiService()
        .organization.identityProviders.get(idpId);

      setProvider(response);
      return response;
    } catch (error) {
      showToast({
        type: 'error',
        message: t('general_error'),
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [coreClient, idpId, t]);

  const fetchOrganizationDetails = useCallback(async (): Promise<void> => {
    if (!coreClient) {
      return;
    }

    try {
      setIsLoading(true);

      const orgData = await coreClient.getMyOrgApiService().organizationDetails.get();
      setOrganization(orgData);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? t('notifications.general_error', { message: error.message })
          : t('notifications.general_error');

      showToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [coreClient, t]);

  const updateProvider = useCallback(
    async (data: UpdateIdentityProviderRequestContent): Promise<void> => {
      if (!coreClient || !provider || !idpId) {
        return;
      }

      try {
        setIsUpdating(true);

        if (update?.onBefore) {
          const canProceed = update.onBefore(provider);
          if (!canProceed) {
            return;
          }
        }

        const result = await coreClient
          .getMyOrgApiService()
          .organization.identityProviders.update(idpId, { strategy: provider.strategy, ...data });
        setProvider(result);

        showToast({
          type: 'success',
          message: t('update_success', { providerName: provider.display_name }),
        });

        if (update?.onAfter) {
          await update.onAfter(provider, result);
        }
      } catch (error) {
        showToast({
          type: 'error',
          message: t('general_error'),
        });
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [coreClient, provider, idpId, update, t],
  );

  const onDeleteConfirm = useCallback(async (): Promise<void> => {
    if (!provider || !coreClient || !provider.id) {
      return;
    }

    try {
      setIsDeleting(true);

      await coreClient.getMyOrgApiService().organization.identityProviders.delete(provider.id);

      showToast({
        type: 'success',
        message: t('delete_success', { providerName: provider.display_name }),
      });

      if (deleteAction?.onAfter) {
        await deleteAction.onAfter(provider);
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: t('general_error'),
      });
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }, [deleteAction, provider, t, coreClient]);

  const onRemoveConfirm = useCallback(async (): Promise<void> => {
    if (!provider || !coreClient || !provider.id) {
      return;
    }

    try {
      setIsRemoving(true);

      await fetchOrganizationDetails();

      await coreClient.getMyOrgApiService().organization.identityProviders.detach(provider.id);

      showToast({
        type: 'success',
        message: t('remove_success', {
          providerName: provider.display_name,
          organizationName: organization?.display_name,
        }),
      });
      if (removeFromOrg?.onAfter) {
        await removeFromOrg.onAfter(provider);
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: t('general_error'),
      });
      throw error;
    } finally {
      setIsRemoving(false);
    }
  }, [removeFromOrg, provider, fetchOrganizationDetails, t, coreClient, organization]);

  useEffect(() => {
    if (!coreClient || !idpId) return;

    setIsLoading(true);
    Promise.allSettled([fetchProvider(), fetchOrganizationDetails()]).finally(() => {
      setIsLoading(false);
    });
  }, [coreClient, idpId]);

  return {
    provider,
    organization,
    isLoading,
    isUpdating,
    isDeleting,
    isRemoving,
    fetchProvider,
    fetchOrganizationDetails,
    updateProvider,
    onDeleteConfirm,
    onRemoveConfirm,
  };
}
