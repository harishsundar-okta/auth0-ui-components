import type {
  SharedComponentProps,
  ProviderSelectMessages,
  ProviderDetailsMessages,
  IdpStrategy,
  ProviderDetailsFormValues,
  ProviderSelectionFormValues,
  ProviderConfigureFormValues,
  IdentityProvider,
  ProviderConfigureMessages,
  ProviderConfigureFieldsMessages,
} from '@auth0-web-ui-components/core';
import type { UseFormReturn } from 'react-hook-form';

export interface SsoProviderCreateClasses {
  'ProviderSelect-root'?: string;
  'ProviderDetails-root'?: string;
  'ProviderConfigure-root'?: string;
}

export interface ProviderSelectProps
  extends SharedComponentProps<ProviderSelectMessages, SsoProviderCreateClasses> {
  strategyList: IdpStrategy[];
  onClickStrategy: (strategy: IdpStrategy) => void;
  selectedStrategy?: IdpStrategy | null;
  form?: UseFormReturn<ProviderSelectionFormValues>;
  className?: string;
}

export interface ProviderDetailsProps
  extends SharedComponentProps<ProviderDetailsMessages, SsoProviderCreateClasses> {
  form: UseFormReturn<ProviderDetailsFormValues>;
  className?: string;
}

export interface ProviderConfigureProps
  extends SharedComponentProps<ProviderConfigureMessages, SsoProviderCreateClasses> {
  form: UseFormReturn<ProviderConfigureFormValues>;
  className?: string;
  strategy?: IdpStrategy;
  provider?: IdentityProvider;
}

export interface ProviderConfigureFieldsProps
  extends SharedComponentProps<ProviderConfigureFieldsMessages, SsoProviderCreateClasses> {
  form: UseFormReturn<ProviderConfigureFormValues>;
  className?: string;
  strategy?: IdpStrategy;
}
