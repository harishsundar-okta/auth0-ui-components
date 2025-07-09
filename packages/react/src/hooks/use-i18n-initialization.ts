import * as React from 'react';
import type { TFactory } from '@auth0-web-ui-components/core';
import { createI18n } from '@auth0-web-ui-components/core';

interface I18nProps {
  currentLanguage?: string;
  fallbackLanguage?: string;
}

interface I18nState {
  initialized: boolean;
  translator: TFactory | undefined;
}

/**
 * Custom hook to handle i18n initialization
 */
export const useI18nInitialization = (i18n?: I18nProps) => {
  const [i18nState, setI18nState] = React.useState<I18nState>({
    initialized: false,
    translator: undefined,
  });

  React.useEffect(() => {
    if (!i18n?.currentLanguage) {
      setI18nState({ initialized: true, translator: undefined });
      return;
    }

    const initializeTranslations = async () => {
      try {
        const instance = await createI18n({
          currentLanguage: i18n.currentLanguage!,
          fallbackLanguage: i18n.fallbackLanguage,
        });

        setI18nState({
          initialized: true,
          translator: instance.t,
        });
      } catch {
        setI18nState({
          initialized: true,
          translator: undefined,
        });
      }
    };

    initializeTranslations();
  }, [i18n?.currentLanguage, i18n?.fallbackLanguage]);

  return i18nState;
};
