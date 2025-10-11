import { Section } from '@/components/ui/section';
import { useTranslator } from '@/hooks';
import type { ProviderConfigureProps } from '@/types';

import { ProviderConfigureFields } from './provider-configure-fields';

export function ProviderConfigure({
  form,
  strategy,
  readOnly = false,
  customMessages = {},
  className,
}: ProviderConfigureProps) {
  const { t } = useTranslator(
    'idp_management.create_sso_provider.provider_configure',
    customMessages,
  );

  return (
    <div className={className}>
      <Section title={t('title')} description={t('description')}>
        <ProviderConfigureFields
          form={form}
          strategy={strategy}
          readOnly={readOnly}
          customMessages={customMessages.fields}
        />
      </Section>
    </div>
  );
}

export default ProviderConfigure;
