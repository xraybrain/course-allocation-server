import { Response } from 'express';
import { AppRequest } from '../models/common.model';
import {
  addLecturer,
  deleteLecturer,
  getLecturers,
  updateLecturer,
} from '../service/lecturer.service';
import Feedback from '../models/Feedback';
import { validateRequest } from '../validators/validateRequest';
import {
  createLecturerSchema,
  updateLecturerSchema,
  qualificationsSchema,
} from '../validators/schemas/lecturerSchema';

export const getLecturersHandler = async (req: AppRequest, res: Response) => {
  let { page, search } = req.query;
  let feedback: Feedback = await getLecturers(
    Number(page) || 1,
    search?.toString()
  );
  res.json(feedback);
};

export const addLecturerHandler = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let { lecturer, qualifications } = formData;
  let feedback: Feedback = new Feedback();
  let validateLecturerResult = await validateRequest(
    createLecturerSchema,
    lecturer
  );
  let validateQualificationResult = await validateRequest(
    qualificationsSchema,
    { qualifications }
  );

  if (validateLecturerResult.valid && validateQualificationResult.valid) {
    lecturer.doa = new Date(lecturer.doa);
    feedback = await addLecturer(formData);
  } else {
    feedback.message = `
    ${validateLecturerResult.errors.join('<br/>')}<br/>
    ${validateQualificationResult.errors.join('<br/>')}`;
    feedback.success = false;
  }
  res.json(feedback);
};

export const updateLecturerHandler = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(updateLecturerSchema, formData);
  if (validateResult.valid) {
    feedback = await updateLecturer(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const deleteLecturerHandler = async (req: AppRequest, res: Response) => {
  let { id } = req.body;
  let feedback: Feedback = await deleteLecturer(id);
  res.json(feedback);
};
