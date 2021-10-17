import { object, string } from 'yup';

export const departmentSchema = object().shape({
  name: string().required(),
});
