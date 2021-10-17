import { object, string } from 'yup';

export const courseSchema = object().shape({
  title: string().max(100).required(),
  code: string().max(10).required(),
});

export const updateCourseSchema = object().shape({
  title: string().min(10).max(100).optional(),
  code: string().min(2).max(10).optional(),
});
