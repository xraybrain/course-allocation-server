import { Response } from 'express';
import { AppRequest } from '../models/common.model';
import {
  addDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from '../service/department.service';
import Feedback from '../models/Feedback';
import { validateRequest } from '../validators/validateRequest';
import { departmentSchema } from '../validators/schemas/departmentSchema';

export const getDepartmentsHandler = async (req: AppRequest, res: Response) => {
  let { page, search } = req.query;
  let feedback: Feedback = await getDepartments(
    Number(page) || 1,
    search?.toString()
  );
  res.json(feedback);
};

export const addDepartmentHandler = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(departmentSchema, formData);
  if (validateResult.valid) {
    feedback = await addDepartment(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const updateDepartmentHandler = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(departmentSchema, formData);
  if (validateResult.valid) {
    feedback = await updateDepartment(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const deleteDepartmentHandler = async (
  req: AppRequest,
  res: Response
) => {
  let { id } = req.body;
  let feedback: Feedback = await deleteDepartment(id);
  res.json(feedback);
};
