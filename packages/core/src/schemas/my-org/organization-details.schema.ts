import { z } from 'zod';

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
 * Creates a conditional string schema with optional regex validation
 */
const createStringSchema = (
  required: boolean,
  regex?: RegExp,
  errorMessage?: string,
  maxLength = 100,
) => {
  if (regex) {
    return required
      ? z.string().min(1, errorMessage).regex(regex, { message: errorMessage })
      : z
          .string()
          .optional()
          .refine((val) => !val || regex.test(val), { message: errorMessage });
  }

  const lengthMsg = `Must be less than ${maxLength} characters`;
  return required
    ? z.string().min(1, errorMessage).max(maxLength, lengthMsg)
    : z
        .string()
        .optional()
        .refine((val) => !val || val.length <= maxLength, { message: lengthMsg });
};

/**
 * Creates logo URL schema with HTTPS validation and optional regex
 */
const createLogoSchema = (required: boolean, regex?: RegExp, errorMessage?: string) => {
  const defaultErrorMsg = errorMessage || 'Please enter a valid HTTPS URL';

  if (regex) {
    // If custom regex is provided, use it instead of HTTPS validation
    return required
      ? z.string().min(1, defaultErrorMsg).regex(regex, { message: defaultErrorMsg })
      : z
          .string()
          .optional()
          .refine((val) => !val || regex.test(val), { message: defaultErrorMsg });
  }

  // Default HTTPS validation
  const httpsUrlSchema = z.string().url(defaultErrorMsg).startsWith('https://', defaultErrorMsg);

  return required
    ? httpsUrlSchema
    : z
        .string()
        .optional()
        .refine(
          (val) => !val || (val.startsWith('https://') && z.string().url().safeParse(val).success),
          { message: defaultErrorMsg },
        );
};

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
