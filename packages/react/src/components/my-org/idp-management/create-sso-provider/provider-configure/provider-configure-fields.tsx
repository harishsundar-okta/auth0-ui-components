import type { ProviderConfigureFormValues } from '@auth0-web-ui-components/core';
import type { ReactNode } from 'react';
import type { Path } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Link } from '@/components/ui/link';
import { TextField } from '@/components/ui/text-field';
import { useTranslator } from '@/hooks';
import type { ProviderConfigureFieldsProps } from '@/types';

type FieldType = 'text' | 'password' | 'checkbox';

interface FieldConfig {
  name: Path<ProviderConfigureFormValues>;
  type: FieldType;
}

const STRATEGY_FIELD_CONFIGS: Record<string, FieldConfig[]> = {
  okta: [
    { name: 'domain', type: 'text' },
    { name: 'client_id', type: 'text' },
    { name: 'client_secret', type: 'password' },
    { name: 'icon_url', type: 'text' },
  ],
  adfs: [
    { name: 'adfs_server', type: 'text' },
    { name: 'fedMetadataXml', type: 'text' },
  ],
  'google-apps': [
    { name: 'domain', type: 'text' },
    { name: 'client_id', type: 'text' },
    { name: 'client_secret', type: 'password' },
    { name: 'icon_url', type: 'text' },
  ],
  oidc: [
    { name: 'type', type: 'text' },
    { name: 'client_id', type: 'text' },
    { name: 'client_secret', type: 'password' },
    { name: 'discovery_url', type: 'text' },
  ],
  'ping-federate': [
    { name: 'signatureAlgorithm', type: 'text' },
    { name: 'digestAlgorithm', type: 'text' },
    { name: 'signSAMLRequest', type: 'checkbox' },
    { name: 'metadataUrl', type: 'text' },
    { name: 'cert', type: 'text' },
    { name: 'signingCert', type: 'text' },
    { name: 'idpInitiated.enabled', type: 'checkbox' },
    { name: 'idpInitiated.client_id', type: 'text' },
    { name: 'idpInitiated.client_protocol', type: 'text' },
    { name: 'idpInitiated.client_authorizequery', type: 'text' },
    { name: 'icon_url', type: 'text' },
  ],
  samlp: [
    { name: 'signatureAlgorithm', type: 'text' },
    { name: 'digestAlgorithm', type: 'text' },
    { name: 'protocolBinding', type: 'text' },
    { name: 'signSAMLRequest', type: 'checkbox' },
    { name: 'bindingMethod', type: 'text' },
    { name: 'metadataUrl', type: 'text' },
    { name: 'cert', type: 'text' },
    { name: 'idpInitiated.enabled', type: 'checkbox' },
    { name: 'idpInitiated.client_id', type: 'text' },
    { name: 'idpInitiated.client_protocol', type: 'text' },
    { name: 'idpInitiated.client_authorizequery', type: 'text' },
    { name: 'icon_url', type: 'text' },
  ],
  waad: [
    { name: 'domain', type: 'text' },
    { name: 'client_id', type: 'text' },
    { name: 'client_secret', type: 'password' },
    { name: 'icon_url', type: 'text' },
  ],
} as const;

const STRATEGY_HELP_URLS: Record<string, Record<string, string>> = {
  okta: {
    domain: 'https://developer.okta.com/docs/guides/find-your-domain/main/',
    client_id: 'https://developer.okta.com/docs/guides/find-your-app-credentials/main',
    client_secret: 'https://developer.okta.com/docs/guides/find-your-app-credentials/main',
  },
} as const;

interface FieldRendererProps {
  fieldConfig: FieldConfig;
  strategyTranslationKey: string;
  strategy: string | undefined;
  form: ProviderConfigureFieldsProps['form'];
  readOnly: boolean;
  t: ReturnType<typeof useTranslator>['t'];
}

function FieldRenderer({
  fieldConfig,
  strategyTranslationKey,
  strategy,
  form,
  readOnly,
  t,
}: FieldRendererProps) {
  const { name, type } = fieldConfig;
  const translationKey = `fields.${strategyTranslationKey}.${name}`;

  const getHelpText = (translationKey: string, fieldName: string): ReactNode => {
    const helpUrl = strategy ? STRATEGY_HELP_URLS[strategy]?.[fieldName] : null;

    if (!helpUrl) {
      return t(`${translationKey}.helper_text`);
    }

    const transResult = t.trans(`${translationKey}.helper_text`, {
      components: {
        link: (children: string) => (
          <Link href={helpUrl} target="_blank" rel="noopener noreferrer">
            {children}
          </Link>
        ),
      },
    });

    return Array.isArray(transResult) ? <>{transResult}</> : transResult;
  };

  const renderFormDescription = (className: string) => (
    <FormDescription className={className}>{getHelpText(translationKey, name)}</FormDescription>
  );

  switch (type) {
    case 'checkbox':
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                  disabled={readOnly}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t(`${translationKey}.label`)}</FormLabel>
                {renderFormDescription('text-sm text-(length:--font-size-paragraph) font-normal')}
              </div>
            </FormItem>
          )}
        />
      );

    case 'text':
    case 'password':
      return (
        <FormField
          key={name}
          control={form.control}
          name={name}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm text-(length:--font-size-label) font-normal">
                {t(`${translationKey}.label`)}
              </FormLabel>
              <FormControl>
                <TextField
                  type={type}
                  placeholder={t(`${translationKey}.placeholder`)}
                  error={Boolean(fieldState.error)}
                  readOnly={readOnly}
                  value={typeof field.value === 'string' ? field.value : ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormMessage
                className="text-left text-sm text-(length:--font-size-paragraph)"
                role="alert"
              />
              {renderFormDescription(
                'text-sm text-(length:--font-size-paragraph) font-normal text-left',
              )}
            </FormItem>
          )}
        />
      );

    default:
      return null;
  }
}

export function ProviderConfigureFields({
  form,
  readOnly = false,
  customMessages = {},
  className,
  strategy,
}: ProviderConfigureFieldsProps) {
  const { t } = useTranslator(
    'idp_management.create_sso_provider.provider_configure',
    customMessages,
  );

  if (!strategy || !(strategy in STRATEGY_FIELD_CONFIGS)) {
    return null;
  }

  const strategyTranslationKey = strategy.replace(/-/g, '_');
  const fieldConfigs = STRATEGY_FIELD_CONFIGS[strategy];

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {fieldConfigs.map((fieldConfig) => (
        <FieldRenderer
          key={fieldConfig.name}
          fieldConfig={fieldConfig}
          strategyTranslationKey={strategyTranslationKey}
          strategy={strategy}
          form={form}
          readOnly={readOnly}
          t={t}
        />
      ))}
    </div>
  );
}
