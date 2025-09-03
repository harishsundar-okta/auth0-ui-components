import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme, useTranslator } from '@/hooks';
import { getComponentStyles } from '@auth0-web-ui-components/core';
import { OrgDeleteProps } from '@/types/my-org-types';
import { cn } from '@/lib/theme-utils';
import { Modal } from '@/components/ui/modal';
import { TextField } from '@/components/ui/text-field';
import { Label } from '@/components/ui/label';
import { withCoreClient } from '@/hoc';

/**
 * OrgDelete Component
 *
 * A component for deleting an organization with a confirmation warning.
 * Displays a card with delete warning message and a destructive action button.
 * Opens a modal with organization name confirmation before deletion.
 *
 * High-level implementation:
 * ```
 * <>
 *   <Card>
 *     <DeleteWarning />
 *     <DeleteButton />
 *   </Card>
 *   <Modal>
 *     <ConfirmationInput />
 *     <ModalActions />
 *   </Modal>
 * </>
 * ```
 *
 * @param {OrgDeleteProps} props - Component properties
 * @returns {React.JSX.Element} The rendered organization delete component
 */
function OrgDeleteComponent({
  styling = { variables: { common: {}, light: {}, dark: {} }, classes: {} },
  customMessages = {},
  onDelete,
  isLoading = false,
  organization,
}: OrgDeleteProps): React.JSX.Element {
  const { t } = useTranslator('orgdelete', customMessages);
  const { isDarkMode } = useTheme();

  const currentStyles = React.useMemo(
    () => getComponentStyles(styling, isDarkMode),
    [styling, isDarkMode],
  );

  const [modalState, setModalState] = React.useState({
    isOpen: false,
    confirmationText: '',
    hasError: false,
  });

  const organizationName = React.useMemo(
    () => organization.display_name || organization.name || '',
    [organization.display_name, organization.name],
  );

  const resetModalState = React.useCallback(() => {
    setModalState({ isOpen: false, confirmationText: '', hasError: false });
  }, []);

  const openModal = React.useCallback(() => {
    setModalState({ isOpen: true, confirmationText: '', hasError: false });
  }, []);

  const handleConfirmationChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setModalState((prev) => ({
      ...prev,
      confirmationText: value,
      hasError: false,
    }));
  }, []);

  const handleConfirmDelete = React.useCallback(async () => {
    if (modalState.confirmationText.trim() !== organizationName) {
      setModalState((prev) => ({ ...prev, hasError: true }));
      return;
    }

    await onDelete(organization.id);
    resetModalState();
  }, [modalState.confirmationText, organizationName, onDelete, organization.id, resetModalState]);

  const errorMessage = modalState.hasError
    ? t('org_name_field_error', { orgName: organizationName })
    : '';

  console.log(modalState.hasError, organizationName, 'chand');
  return (
    <>
      <div style={currentStyles.variables} className="w-full">
        <Card className={cn('p-6', currentStyles.classes?.['OrgDelete-card'])}>
          <CardContent className="flex items-start justify-between gap-6 p-0">
            <div className="flex-1 space-y-2">
              <h3
                className={cn('text-lg font-semibold text-left text-(length:--font-size-subtitle)')}
              >
                {t('title', { orgName: organizationName })}
              </h3>
              <p
                className={cn(
                  'text-sm text-muted-foreground text-left text-(length:--font-size-paragraph)',
                )}
              >
                {t('description')}
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={openModal}
              disabled={isLoading}
              className={cn('shrink-0', currentStyles.classes?.['OrgDelete-button'])}
            >
              {t('delete_button_label')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Modal
        open={modalState.isOpen}
        onOpenChange={(open) => !open && resetModalState()}
        className={cn('p-10', currentStyles.classes?.['OrgDelete-modal'])}
        title={t('modal_title', { orgName: organizationName })}
        content={
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              {t('modal_description', { orgName: organizationName })}
            </p>

            <div className="space-y-2">
              <Label htmlFor="org-confirmation">{t('org_name_field_label')}</Label>
              <TextField
                id="org-confirmation"
                placeholder={t('org_name_field_placeholder')}
                value={modalState.confirmationText}
                onChange={handleConfirmationChange}
                error={modalState.hasError}
                aria-invalid={modalState.hasError}
                helperText={errorMessage}
              />
            </div>
          </div>
        }
        modalActions={{
          nextAction: {
            label: t('delete_button_label'),
            onClick: handleConfirmDelete,
            variant: 'destructive',
            className: currentStyles.classes?.['OrgDelete-button'],
          },
          previousAction: {
            label: t('cancel_button_label'),
            onClick: resetModalState,
          },
        }}
      />
    </>
  );
}

export const OrgDelete = withCoreClient(OrgDeleteComponent);
