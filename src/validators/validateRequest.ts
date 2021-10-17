import { AnySchema } from 'yup';

export const validateRequest = async (schema: AnySchema, data: any) => {
  let validated = { valid: false, errors: [] };
  try {
    await schema.validate(data);
    validated.valid = true;
  } catch (e: any) {
    validated.errors = e.errors;
  }
  return validated;
};
