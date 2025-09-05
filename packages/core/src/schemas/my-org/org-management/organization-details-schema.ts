import { z } from 'zod';
import { createStringSchema, createLogoSchema } from '@core/schemas/common';

/**
 * Simplified validation options for organization detail schema
 */
export interface OrganizationDetailSchemaValidation {
  name?: RegExp;
  displayName?: RegExp;
  color?: RegExp;
  logoURL?: RegExp;
}

/**
 * Configuration options for organization detail schema validation
 */
export interface OrganizationDetailSchemaOptions {
  name?: {
    regex?: RegExp;
    errorMessage?: string;
  };
  displayName?: {
    regex?: RegExp;
    errorMessage?: string;
  };
  color?: {
    regex?: RegExp;
    errorMessage?: string;
  };
  logoURL?: {
    regex?: RegExp;
    errorMessage?: string;
  };
}

/**
 * Creates a schema for organization detail form validation
 * @param options - Configuration options for schema validation
 * @returns Zod schema for organization detail validation
 */
export const createOrganizationDetailSchema = (options: OrganizationDetailSchemaOptions = {}) => {
  const { name = {}, displayName = {}, color = {}, logoURL = {} } = options;

  // Set defaults
  const colorRegex = color.regex || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const colorErrorMessage = color.errorMessage || 'Invalid color format';

  return z.object({
    name: createStringSchema(true, name.regex, name.errorMessage),
    display_name: createStringSchema(true, displayName.regex, displayName.errorMessage),
    branding: z.object({
      logo_url: createLogoSchema(false, logoURL.regex, logoURL.errorMessage),
      colors: z.object({
        primary: z.string().regex(colorRegex, colorErrorMessage),
        page_background: z.string().regex(colorRegex, colorErrorMessage),
      }),
    }),
  });
};

/**
 * Default schema for organization detail form validation
 */
export const organizationDetailSchema = createOrganizationDetailSchema();

/**
 * Type for organization detail form data
 */
export type OrganizationDetailFormValues = z.infer<typeof organizationDetailSchema>;
