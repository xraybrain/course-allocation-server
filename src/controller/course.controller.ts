import { Response } from 'express';
import { AppRequest } from '../models/common.model';
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from '../service/course.service';
import Feedback from '../models/Feedback';
import { validateRequest } from '../validators/validateRequest';
import {
  courseSchema,
  updateCourseSchema,
} from '../validators/schemas/courseSchema';

export const getCoursesHandler = async (req: AppRequest, res: Response) => {
  let { page, search } = req.query;
  let feedback: Feedback = await getCourses(
    Number(page) || 1,
    search?.toString()
  );
  res.json(feedback);
};

export const addCourseHandler = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(courseSchema, formData);
  if (validateResult.valid) {
    feedback = await addCourse(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const updateCourseHandler = async (req: AppRequest, res: Response) => {
  let formData = req.body;
  let feedback: Feedback = new Feedback();
  let validateResult = await validateRequest(updateCourseSchema, formData);
  if (validateResult.valid) {
    feedback = await updateCourse(formData);
  } else {
    feedback.message = validateResult.errors.join('<br/>');
    feedback.success = false;
  }
  res.json(feedback);
};

export const deleteCourseHandler = async (req: AppRequest, res: Response) => {
  let { id } = req.body;
  let feedback: Feedback = await deleteCourse(id);
  res.json(feedback);
};
