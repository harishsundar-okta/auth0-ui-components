import type { OrganizationDetailFormValues } from '@auth0-web-ui-components/core';
import { getComponentStyles } from '@auth0-web-ui-components/core';
import { Flag } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { OrgDelete } from '@/components/my-org/org-management/org-delete';
import { OrgDetails } from '@/components/my-org/org-management/org-details';
import { Header } from '@/components/ui/header';
import { withCoreClient } from '@/hoc';
import { useTheme, useTranslator } from '@/hooks';
import type { OrgDetailsEditProps } from '@/types/my-org/org-management/ord-details-edit-types';
import type { OrgDetailsFormActions } from '@/types/my-org/org-management/org-details-types';

/**
 * OrgDetailsEdit Component
 *
 * A comprehensive organization editing component that combines organization details
 * editing and deletion capabilities in a single interface. This component provides
 * a complete editing experience with form validation, lifecycle hooks, and user feedback.
 */
function OrgDetailsEditComponent({
  organizationId,
  isLoading = false,
  schema,
  customMessages = {},
  styling = {
    variables: { common: {}, light: {}, dark: {} },
    classes: {},
  },
  readOnly = false,
  formActions,
  hideHeader = false,
  backButton,
}: OrgDetailsEditProps): React.JSX.Element {
  const { details: orgdetailsMessages = {}, delete: orgdeleteMessages = {} } = customMessages;
  const { t } = useTranslator('org_management.org_details_edit', customMessages);
  const { isDarkMode } = useTheme();
  const [isDeleting, setIsDeleting] = React.useState(false);

  // fetch details from hook
  const organization = {
    id: 'org_12345',
    name: 'acme-corp',
    display_name: 'Acme Corporation',
    branding: {
      logo_url: 'https://picsum.photos/200',
      colors: {
        primary: '#007bff',
        page_background: '#ffffff',
      },
    },
  };

  const currentStyles = React.useMemo(
    () => getComponentStyles(styling, isDarkMode),
    [styling, isDarkMode],
  );

  const handleSubmit = React.useCallback(
    async (data: OrganizationDetailFormValues & { id?: string }): Promise<boolean> => {
      const { saveAction } = formActions;
      if (saveAction?.onBefore) {
        const canProceed = saveAction.onBefore(
          data as OrganizationDetailFormValues & { id: string },
        );
        if (!canProceed) {
          return false;
        }
      }

      try {
        //await onSave(data); will be a hook
        toast.success(t('save_org_changes_message', { orgName: organization.display_name }), {
          className: 'text-success-foreground',
          icon: <Flag className="h-4 w-4" />,
        });
        if (saveAction?.onAfter) {
          saveAction.onAfter(data as OrganizationDetailFormValues & { id: string });
        }
        return true;
      } catch (error) {
        toast.error(t('org_changes_error_message'), {
          className: 'text-destructive-foreground',
          icon: <Flag className="h-4 w-4" />,
        });
        return false;
      }
    },
    [formActions.saveAction, t],
  );

  const handleDelete = React.useCallback(
    async (orgId: string) => {
      const { deleteAction } = formActions;
      if (deleteAction?.onBefore) {
        const canProceed = deleteAction.onBefore(
          organization as OrganizationDetailFormValues & { id: string },
        );
        if (!canProceed) {
          return;
        }
      }

      setIsDeleting(true);
      try {
        //await onDelete(orgId); will be a hook
        console.log(orgId, organizationId);
        toast.success(t('delete_org_message', { orgName: organization.display_name }), {
          className: 'text-success-foreground',
          icon: <Flag className="h-4 w-4" />,
        });

        if (deleteAction?.onAfter) {
          deleteAction.onAfter(organization as OrganizationDetailFormValues & { id: string });
        }
      } catch (error) {
        toast.error(t('org_changes_error_message'), {
          className: 'text-destructive-foreground',
          icon: <Flag className="h-4 w-4" />,
        });
      } finally {
        setIsDeleting(false);
      }
    },
    [formActions.deleteAction, organization, t],
  );

  const enhancedFormActions = React.useMemo(
    (): OrgDetailsFormActions => ({
      previousAction: formActions.cancelAction,
      showPrevious: formActions.showCancel,
      nextAction: {
        label: formActions.saveAction?.label,
        disabled: formActions.saveAction?.disable || readOnly,
        onClick: handleSubmit,
        className: formActions.saveAction?.className,
      },
      ...formActions,
    }),
    [formActions, handleSubmit, readOnly, t],
  );

  return (
    <div style={currentStyles.variables} className="w-full">
      {!hideHeader && (
        <div className="mb-8">
          <Header
            title={t('header.title', { orgName: organization.display_name })}
            backButton={
              backButton && {
                ...backButton,
                text: backButton.text || t('header.back_button_text'),
              }
            }
          />
        </div>
      )}

      <div className="mb-8">
        <OrgDetails
          organization={organization}
          isLoading={isLoading}
          schema={schema}
          customMessages={orgdetailsMessages}
          styling={styling}
          readOnly={readOnly}
          formActions={enhancedFormActions}
        />
      </div>

      <OrgDelete
        organization={organization}
        onDelete={handleDelete}
        isLoading={isDeleting}
        schema={schema}
        styling={styling}
        customMessages={orgdeleteMessages}
      />
    </div>
  );
}

export const OrgDetailsEdit = withCoreClient(OrgDetailsEditComponent);
