import * as React from 'react';

import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Modal } from '../../../../components/ui/modal';
import { useTranslator } from '../../../../hooks/use-translator';
import { cn } from '../../../../lib/theme-utils';
import type { SsoProviderDeleteProps } from '../../../../types/my-org/idp-management/sso-provider-delete-types';

import { SsoProviderDeleteModalContent } from './provider-delete-modal-content';

export function SsoProviderDelete({
  className,
  provider,
  onDelete,
  customMessages = {},
  isLoading,
}: SsoProviderDeleteProps) {
  const { t } = useTranslator(
    'idp_management.edit_sso_provider.delete_sso_provider',
    customMessages,
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [confirmationText, setConfirmationText] = React.useState('');

  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
    setConfirmationText('');
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalContentChange = React.useCallback((field: string, value: string) => {
    setConfirmationText(value);
  }, []);

  const handleDelete = React.useCallback(async () => {
    if (provider.id) {
      await onDelete(provider.id);
      closeModal();
    }
  }, [onDelete, provider.id, closeModal]);

  return (
    <>
      <div className={cn('w-full', className)}>
        <Card className="p-6">
          <CardContent className="flex items-start justify-between gap-6 p-0">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-left text-(length:--font-size-subtitle)">
                {t('title', { providerName: provider.name })}
              </h3>
              <p className="text-sm text-muted-foreground text-left text-(length:--font-size-paragraph)">
                {t('description')}
              </p>
            </div>

            <Button variant="destructive" onClick={openModal} className="shrink-0">
              {t('delete_button_label')}
            </Button>
          </CardContent>
        </Card>
      </div>
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => !open && closeModal()}
        className="p-10"
        title={t('modal.title', { providerName: provider.name })}
        content={
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {t('modal.description', { providerName: provider.name })}
            </p>

            <SsoProviderDeleteModalContent
              onChange={handleModalContentChange}
              customMessages={customMessages.modal?.modal_content}
            />
          </div>
        }
        modalActions={{
          nextAction: {
            type: 'button',
            label: t('modal.actions.delete_button_label'),
            onClick: handleDelete,
            variant: 'destructive',
            disabled: isLoading || confirmationText !== provider.name,
          },
          previousAction: {
            label: t('modal.actions.cancel_button_label'),
            onClick: closeModal,
          },
        }}
      />
    </>
  );
}
