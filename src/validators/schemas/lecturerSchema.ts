import { object, string, number, array } from 'yup';

export const createLecturerSchema = object().shape({
  lastname: string().max(20).required(),
  firstname: string().max(20).required(),
  email: string().email().max(40).required(),
  phone: string().max(14).min(10).required(),
  doa: string().required(),
  gender: string().min(4).max(6).required(),
  deptId: number().required(),
});

export const qualificationsSchema = object().shape({
  qualifications: array().of(number().min(1)).compact().min(1).required(),
});

export const updateLecturerSchema = object().shape({
  lastname: string().max(20).optional(),
  firstname: string().max(20).optional(),
  email: string().email().max(40).optional(),
  phone: string().max(14).min(10).optional(),
  doa: string().optional(),
  gender: string().min(4).max(6).optional(),
  deptId: number().optional(),
});
