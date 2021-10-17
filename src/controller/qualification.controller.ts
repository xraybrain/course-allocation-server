import { Response } from 'express';
import { AppRequest } from '../models/common.model';
import {
  addQualification,
  deleteQualification,
  getQualifications,
  updateQualification,
} from '../service/qualification.service';
import Feedback from '../models/Feedback';
import { validateRequest } from '../validators/validateRequest';
import {
  createQualificationSchema,
  updateQualificationSchema,
} from '../validators/schemas/qualificationSchema';

export const getQualificationsHandler = async (
  req: AppRequest,
  res: Response
) => {
  let { page, search } = req.query;
  let feedback: Feedback = await getQualifications(
    Number(page) || 1,
    search?.toString()
  );
  res.json(feedback);
};

export const addQualificationHandler = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(
    createQualificationSchema,
    formData
  );
  if (validateResult.valid) {
    feedback = await addQualification(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const updateQualificationHandler = async (
  req: AppRequest,
  res: Response
) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(
    updateQualificationSchema,
    formData
  );
  if (validateResult.valid) {
    feedback = await updateQualification(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const deleteQualificationHandler = async (
  req: AppRequest,
  res: Response
) => {
  let { id } = req.body;
  let feedback: Feedback = await deleteQualification(id);
  res.json(feedback);
};
