import { z } from 'zod';

/**
 * Creates a conditional string schema with optional regex validation
 */
export const createStringSchema = (
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
 * Creates logo URL schema with HTTP validation and optional regex
 */
export const createLogoSchema = (required: boolean, regex?: RegExp, errorMessage?: string) => {
  const defaultErrorMsg = errorMessage || 'Please enter a valid HTTP URL';

  if (regex) {
    // If custom regex is provided, use it instead of HTTP validation
    return required
      ? z.string().min(1, defaultErrorMsg).regex(regex, { message: defaultErrorMsg })
      : z
          .string()
          .optional()
          .refine((val) => !val || regex.test(val), { message: defaultErrorMsg });
  }

  // Default HTTP validation
  const httpUrlSchema = z.string().url(defaultErrorMsg).startsWith('http://', defaultErrorMsg);

  return required
    ? httpUrlSchema
    : z
        .string()
        .optional()
        .refine(
          (val) => !val || (val.startsWith('http://') && z.string().url().safeParse(val).success),
          { message: defaultErrorMsg },
        );
};
