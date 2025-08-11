export interface Styling {
  common?: Record<string, string> & {
    '--font-size-heading'?: string;
    '--font-size-description'?: string;
    '--font-size-title'?: string;
    '--font-size-paragraph'?: string;
    '--font-size-label'?: string;
  };
  light?: Record<string, string> & {
    '--color-card-foreground'?: string;
    '--bg-color'?: string;
    '--color-primary'?: string;
    '--color-primary-foreground'?: string;
    '--color-foreground'?: string;
    '--color-muted-foreground'?: string;
    '--color-accent-foreground'?: string;
  };
  dark?: Record<string, string> & {
    '--bg-color'?: string;
    '--color-primary'?: string;
    '--color-primary-foreground'?: string;
    '--color-foreground'?: string;
    '--color-muted-foreground'?: string;
    '--color-accent-foreground'?: string;
  };
}

/**
 * Returns the merged CSS variables for the current theme.
 *
 * Combines the common styles with the theme-specific styles
 * based on the `isDarkMode` flag.
 *
 * @param styling - An object containing common, light, and dark style variables.
 * @param isDarkMode - A boolean indicating if dark mode is active.
 * @returns A merged object of CSS variables for the active theme.
 */
export const getCurrentStyles = (
  styling: Styling = { common: {}, light: {}, dark: {} },
  isDarkMode = false,
): Record<string, string> => ({
  ...styling.common,
  ...(isDarkMode ? styling.dark : styling.light),
});

/**
 * Apply style overrides to the :root element or .dark class based on the theme mode.
 *
 * Dynamically applies the appropriate theme class to the `html` element.
 *
 * @param styling - An object containing CSS variable overrides.
 * @param mode - The current theme mode ('dark' or 'light'). Defaults to 'light'.
 * @param theme - The selected theme ('default', 'minimal', 'rounded'). Defaults to 'default'.
 */
export function applyStyleOverrides(
  styling: Styling,
  mode: 'dark' | 'light' = 'light',
  theme: 'default' | 'minimal' | 'rounded' = 'default',
): void {
  const isDarkMode = mode === 'dark';
  const htmlElement = document.documentElement;

  // Remove existing theme classes if not default
  if (theme !== 'default') {
    htmlElement.classList.remove(
      'theme-minimal',
      'theme-rounded',
      'theme-minimal-dark',
      'theme-rounded-dark',
    );

    // Add the new theme class
    const themeClass = `theme-${theme}${isDarkMode ? '-dark' : ''}`;
    console.log('i am here', themeClass);
    htmlElement.classList.add(themeClass);
  }

  // Apply CSS variable overrides (if any)
  const mergedStyles = getCurrentStyles(styling, isDarkMode);
  Object.entries(mergedStyles).forEach(([key, value]) => {
    htmlElement.style.setProperty(key, value);
  });
}
