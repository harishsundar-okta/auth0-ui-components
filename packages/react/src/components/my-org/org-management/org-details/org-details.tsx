import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme, useTranslator } from '@/hooks';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FormActions } from '@/components/ui/form-actions';
import { Form } from '@/components/ui/form';
import { SettingsDetails } from './settings-details';
import { BrandingDetails } from './branding-details';
import { cn } from '@/lib/theme-utils';
import { OrgDetailsProps } from '@/types';
import {
  OrganizationDetailFormValues,
  getComponentStyles,
  createOrganizationDetailSchema,
} from '@auth0-web-ui-components/core';
import { withCoreClient } from '@/hoc';

/**
 * OrgDetails Component
 *
 * A presentation component that displays organization details including settings and branding fields.
 * This component renders form fields for organization configuration in a structured layout with sections.
 * All data, validation, and business logic are handled via props passed from parent components.
 *
 * High-level implementation:
 * ```
 * <>
 *   <Form>
 *     <SettingsDetails />
 *     <BrandingDetails />
 *     <FormActions />
 *   </Form>
 * </>
 * ```
 *
 * @param {Partial<OrganizationDetailFormValues>} [organization={}] - Initial organization data for form fields
 * @param {boolean} [isLoading=false] - Whether the form is in a loading state
 * @param {object} [schemaValidation] - Custom validation rules for form fields
 * @param {RegExp} [schemaValidation.name] - Regex pattern for organization name validation
 * @param {RegExp} [schemaValidation.displayName] - Regex pattern for display name validation
 * @param {RegExp} [schemaValidation.color] - Regex pattern for color field validation
 * @param {RegExp} [schemaValidation.logoURL] - Regex pattern for logo URL validation
 * @param {object} [customMessages={}] - Custom messages for internationalization
 * @param {object} [styling] - Styling configuration for customizing component appearance
 * @param {object} [styling.variables] - CSS custom properties for theming
 * @param {object} [styling.classes] - CSS class overrides
 * @param {boolean} [readOnly=false] - Whether the form should be in read-only mode
 * @param {object} formActions - Configuration for form action buttons
 * @param {object} [formActions.nextAction] - Primary action button configuration
 * @param {Function} [formActions.nextAction.onClick] - Callback when form is submitted with valid data
 * @param {object} [formActions.previousAction] - Secondary action button configuration
 * @param {boolean} [formActions.showPrevious] - Whether to show the previous/cancel button
 * @param {boolean} [formActions.showUnsavedChanges] - Whether to show unsaved changes indicator
 * @param {string} [formActions.align] - Alignment of action buttons ('left' | 'right')
 * @param {string} [formActions.className] - Additional CSS classes for form actions
 * @param {string} [formActions.unsavedChangesText] - Custom text for unsaved changes message
 *
 * @example
 * ```tsx
 * <OrgDetails
 *   organization={{
 *     name: 'acme',
 *     display_name: 'Acme Corp.',
 *     branding: {
 *       logo_url: 'https://cdn.acme.com/logo.png',
 *       colors: { primary: '#007bff', page_background: '#ffffff' }
 *     }
 *   }}
 *   schemaValidation={{
 *     name: /^[a-zA-Z0-9_-]{1,50}$/,
 *     displayName: /^[a-zA-Z0-9\s_-]{1,100}$/,
 *     color: /^#[A-Fa-f0-9]{6}$/
 *   }}
 *   formActions={{
 *     nextAction: {
 *       label: 'Save Organization',
 *       onClick: async (data) => {
 *         await saveOrganization(data);
 *       }
 *     },
 *     previousAction: {
 *       label: 'Cancel',
 *       onClick: () => navigate('/organizations')
 *     },
 *     showPrevious: true,
 *     showUnsavedChanges: true
 *   }}
 *   styling={{
 *     variables: {
 *       common: { '--border-radius': '8px' },
 *       light: { '--primary-color': '#007bff' },
 *       dark: { '--primary-color': '#0056b3' }
 *     },
 *     classes: { 'OrgDetails-card': 'custom-card-class' }
 *   }}
 *   isLoading={false}
 *   readOnly={false}
 * />
 * ```
 *
 * @returns {React.JSX.Element} The rendered organization details form component
 */
function OrgDetailsComponent({
  organization = {},
  isLoading = false,
  schemaValidation,
  customMessages = {},
  styling = {
    variables: { common: {}, light: {}, dark: {} },
    classes: {},
  },
  readOnly = false,
  formActions,
}: OrgDetailsProps): React.JSX.Element {
  const { t } = useTranslator('org_management', customMessages);

  const { isDarkMode } = useTheme();
  const currentStyles = React.useMemo(
    () => getComponentStyles(styling, isDarkMode),
    [styling, isDarkMode],
  );

  const organizationDetailSchema = React.useMemo(() => {
    return createOrganizationDetailSchema({
      name: {
        regex: schemaValidation?.name,
        errorMessage: t('org_details.sections.settings.fields.name.error'),
      },
      displayName: {
        regex: schemaValidation?.displayName,
        errorMessage: t('org_details.sections.settings.fields.display_name.error'),
      },
      color: {
        regex: schemaValidation?.color,
        errorMessage: t('org_details.sections.branding.fields.primary_color.error'),
      },
      logoURL: {
        regex: schemaValidation?.logoURL,
        errorMessage: t('org_details.sections.branding.fields.logo.error'),
      },
    });
  }, [t, schemaValidation]);

  const form = useForm<OrganizationDetailFormValues>({
    resolver: zodResolver(organizationDetailSchema),
    defaultValues: {
      name: organization?.name || '',
      display_name: organization?.display_name || '',
      branding: {
        logo_url: organization?.branding?.logo_url || '',
        colors: {
          primary: organization?.branding?.colors?.primary || '#000000',
          page_background: organization?.branding?.colors?.page_background || '#ffffff',
        },
      },
    },
  });

  const hasUnsavedChanges = form.formState.isDirty;

  const onValid = React.useCallback(
    async (values: OrganizationDetailFormValues) => {
      if (formActions?.nextAction?.onClick) {
        await formActions.nextAction.onClick(values);
      }
    },
    [formActions?.nextAction],
  );

  const handlePreviousAction = React.useCallback(
    (event: Event) => {
      form.reset();
      formActions?.previousAction?.onClick?.(event);
    },
    [form, formActions?.previousAction?.onClick],
  );

  return (
    <div style={currentStyles.variables} className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="space-y-6">
          <Card className={cn('p-6', currentStyles.classes?.['OrgDetails-card'])}>
            <div className="space-y-6">
              <SettingsDetails form={form} readOnly={readOnly} customMessages={customMessages} />

              <Separator />

              <BrandingDetails form={form} readOnly={readOnly} customMessages={customMessages} />

              <FormActions
                hasUnsavedChanges={hasUnsavedChanges}
                isLoading={isLoading}
                nextAction={{
                  label: formActions?.nextAction?.label || t('org_details.submit_button_label'),
                  disabled:
                    formActions?.nextAction?.disabled ||
                    !hasUnsavedChanges ||
                    isLoading ||
                    readOnly,
                  ...formActions?.nextAction,
                }}
                previousAction={
                  formActions?.previousAction && {
                    ...formActions.previousAction,
                    onClick: handlePreviousAction,
                  }
                }
                showPrevious={formActions?.showPrevious}
                unsavedChangesText={
                  formActions?.unsavedChangesText || t('org_details.unsaved_changes_text')
                }
                showUnsavedChanges={formActions?.showUnsavedChanges}
                align={formActions?.align}
                className={formActions?.className}
              />
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export const OrgDetails = withCoreClient(OrgDetailsComponent);
