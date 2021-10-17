import { number, object, string } from 'yup';

export const createQualificationSchema = object().shape({
  title: string().required(),
  grade: number().required(),
});

export const updateQualificationSchema = object().shape({
  title: string().optional(),
  grade: number().optional(),
});
