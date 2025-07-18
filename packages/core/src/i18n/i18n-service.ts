import {
  LangTranslations,
  TranslationFunction,
  I18nInitOptions,
  TFactory,
  I18nServiceInterface,
} from './i18n-types';

// Pure utility functions for i18n functionality
export const I18nUtils = {
  /**
   * Variable substitution regex
   */
  VAR_REGEX: /\${(\w+)}/g,

  /**
   * Get nested value from object using dot notation
   */
  getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    let current: unknown = obj;
    const keys = path.split('.');

    for (const key of keys) {
      if (current == null || typeof current !== 'object' || Array.isArray(current)) {
        return undefined;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return current;
  },

  /**
   * Substitute variables in a string
   */
  substitute(template: string, vars?: Record<string, unknown>): string {
    if (!vars) return template;

    if (!template.includes('${')) return template;

    I18nUtils.VAR_REGEX.lastIndex = 0;
    return template.replace(I18nUtils.VAR_REGEX, (_, key) => String(vars[key] ?? ''));
  },

  /**
   * Create a translation function for a specific namespace
   */
  createTranslator(
    namespace: string,
    translations: LangTranslations | null,
    overrides?: Record<string, unknown>,
  ): TranslationFunction {
    const prefix = `${namespace}.`;
    const hasOverrides = overrides && Object.keys(overrides).length > 0;

    return (key: string, vars?: Record<string, unknown>): string => {
      const fullKey = prefix + key;

      if (hasOverrides) {
        const overrideValue = I18nUtils.getNestedValue(overrides!, key);
        if (overrideValue !== undefined) {
          return I18nUtils.substitute(String(overrideValue), vars);
        }
      }

      if (!translations) {
        return `${prefix}${key}`;
      }

      const translationValue = I18nUtils.getNestedValue(translations, fullKey);
      const finalValue = translationValue !== undefined ? String(translationValue) : key;

      return I18nUtils.substitute(finalValue, vars);
    };
  },

  /**
   * Load translations for a specific language
   */
  async loadTranslations(
    language: string,
    cache?: Map<string, LangTranslations | null>,
  ): Promise<LangTranslations | null> {
    if (cache?.has(language)) {
      return cache.get(language)!;
    }

    try {
      const mod = await import(`./translations/${language}.json`);
      const data = mod.default ?? mod;
      if (cache) {
        cache.set(language, data);
      }
      return data;
    } catch {
      if (cache) {
        cache.set(language, null);
      }
      return null;
    }
  },

  /**
   * Load translations with fallback support
   */
  async loadTranslationsWithFallback(
    currentLanguage: string,
    fallbackLanguage?: string,
    cache?: Map<string, LangTranslations | null>,
  ): Promise<LangTranslations | null> {
    // Try to load current language first
    let result = await I18nUtils.loadTranslations(currentLanguage, cache);
    if (result) return result;

    // Fallback to fallback language if available
    if (fallbackLanguage && fallbackLanguage !== currentLanguage) {
      result = await I18nUtils.loadTranslations(fallbackLanguage, cache);
      if (result) return result;
    }

    // Final fallback to en-US if not already tried
    if (currentLanguage !== 'en-US' && fallbackLanguage !== 'en-US') {
      return I18nUtils.loadTranslations('en-US', cache);
    }

    return null;
  },

  /**
   * Create translator factory function
   */
  createTranslatorFactory(translations: LangTranslations | null): TFactory {
    return (namespace: string, overrides?: Record<string, unknown>) =>
      I18nUtils.createTranslator(namespace, translations, overrides);
  },

  /**
   * Create common translator (shorthand for 'common' namespace)
   */
  createCommonTranslator(translations: LangTranslations | null): TranslationFunction {
    return I18nUtils.createTranslator('common', translations);
  },
};

// Functional approach for creating i18n service
export async function createI18nService(
  options: I18nInitOptions = {},
): Promise<I18nServiceInterface> {
  const currentLanguage = options.currentLanguage ?? 'en-US';
  const fallbackLanguage = options.fallbackLanguage ?? 'en-US';
  const cache = new Map<string, LangTranslations | null>();

  // Load initial translations
  const translations = await I18nUtils.loadTranslationsWithFallback(
    currentLanguage,
    fallbackLanguage,
    cache,
  );

  // State management through closure
  let _currentLanguage = currentLanguage;
  let _fallbackLanguage = fallbackLanguage;
  let _translations = translations;

  const service: I18nServiceInterface = {
    get currentLanguage(): string {
      return _currentLanguage;
    },

    get fallbackLanguage(): string | undefined {
      return _fallbackLanguage;
    },

    get translator(): TFactory {
      return I18nUtils.createTranslatorFactory(_translations);
    },

    get commonTranslator(): TranslationFunction {
      return I18nUtils.createCommonTranslator(_translations);
    },

    getCurrentTranslations(): LangTranslations | null {
      return _translations;
    },

    async changeLanguage(language: string, newFallbackLanguage?: string): Promise<void> {
      try {
        _currentLanguage = language;
        _fallbackLanguage = newFallbackLanguage ?? _fallbackLanguage;

        _translations = await I18nUtils.loadTranslationsWithFallback(
          _currentLanguage,
          _fallbackLanguage,
          cache,
        );
      } catch (error) {
        throw new Error(
          `Failed to change language to '${language}': ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    },
  };

  return service;
}
