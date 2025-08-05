'use client';

import * as React from 'react';
import { applyStyleOverrides } from '@auth0-web-ui-components/core';
import type { StyleOverrides, ThemeContextValue, ThemeInput } from '@/types/theme-types';

/**
 * Default empty customer overrides. (later may be UL branding)
 */
const defaultStyleOverrides: StyleOverrides = {};

/**
 * ThemeContext
 *
 * Provides access to customer overrides and a merged theme object for convenience.
 */
export const ThemeContext = React.createContext<ThemeContextValue>({
  styleOverrides: defaultStyleOverrides,
  loader: null,
});

/**
 * ThemeProvider
 *
 * Provides theme configuration via React Context to all components in the tree.
 * It merges optional customer overrides (CSS variables).
 *
 * @param theme - Optional customerOverrides
 * @param children - The components that will have access to the theme
 *
 * @example
 * ```tsx
 * <ThemeProvider
 *   theme={{
 *     mode: 'dark',
 *     styleOverrides: { '--font-size-heading': '1rem' },
 *     loader: <CustomSpinner />
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<{
  theme?: ThemeInput;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const styleOverrides = React.useMemo(
    () => theme?.styleOverrides ?? defaultStyleOverrides,
    [theme?.styleOverrides],
  );

  const loader = React.useMemo(() => theme?.loader ?? null, [theme?.loader]);

  React.useEffect(() => {
    applyStyleOverrides(styleOverrides, theme?.mode);
  }, [styleOverrides, theme?.mode]);

  return (
    <ThemeContext.Provider value={{ styleOverrides, loader }}>{children}</ThemeContext.Provider>
  );
};
