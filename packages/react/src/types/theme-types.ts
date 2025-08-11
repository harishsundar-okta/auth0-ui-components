/**
 * Theme configuration
 * @property {('light'|'dark')} [mode] - Theme mode
 * @property {string} [primaryColor] - Primary color for theming
 */
export interface ThemeSettings {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  [key: string]: unknown;
}

/**
 * BrandingTheme
 *
 * Controlled UL branding configuration.
 */
export type BrandingTheme = {
  mode?: 'light' | 'dark' | 'system';
  primaryColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  [key: string]: unknown;
};

/**
 * CustomerOverrides
 *
 * Custom CSS variable overrides (e.g. "--button-radius": "6px").
 */
export type CustomOverrides = Record<string, string>;

/**
 * ThemeInput
 *
 * Optional props passed into the ThemeProvider.
 */
export type ThemeInput = {
  branding?: BrandingTheme;
  customOverrides?: CustomOverrides;
};

/**
 * ThemeContextValue
 *
 * The values made available through the ThemeContext.
 */
export type ThemeContextValue = {
  branding: BrandingTheme;
  customOverrides: CustomOverrides;
  mergedTheme: Record<string, unknown>;
};
