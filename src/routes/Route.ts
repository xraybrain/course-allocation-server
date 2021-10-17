import { Application } from 'express';
import {
  addCourseHandler,
  deleteCourseHandler,
  getCoursesHandler,
  updateCourseHandler,
} from '../controller/course.controller';
import {
  getDepartmentsHandler,
  addDepartmentHandler,
  updateDepartmentHandler,
  deleteDepartmentHandler,
} from '../controller/department.controller';
import {
  addLecturerHandler,
  deleteLecturerHandler,
  getLecturersHandler,
  updateLecturerHandler,
} from '../controller/lecturer.controller';
import {
  addQualificationHandler,
  deleteQualificationHandler,
  getQualificationsHandler,
  updateQualificationHandler,
} from '../controller/qualification.controller';

export default class Route {
  constructor(private app: Application) {
    this.routes();
  }

  routes() {
    /** Department Routes */
    this.app.get('/departments', getDepartmentsHandler);
    this.app.post('/department', addDepartmentHandler);
    this.app.put('/department', updateDepartmentHandler);
    this.app.delete('/department', deleteDepartmentHandler);
    /** Department Routes */

    /** Course Routes */
    this.app.get('/courses', getCoursesHandler);
    this.app.post('/course', addCourseHandler);
    this.app.put('/course', updateCourseHandler);
    this.app.delete('/course', deleteCourseHandler);
    /** Course Routes */

    /** Qualification Routes */
    this.app.get('/qualifications', getQualificationsHandler);
    this.app.post('/qualification', addQualificationHandler);
    this.app.put('/qualification', updateQualificationHandler);
    this.app.delete('/qualification', deleteQualificationHandler);
    /** Qualification Routes */

    /** Lecturer Routes */
    this.app.get('/lecturers', getLecturersHandler);
    this.app.post('/lecturer', addLecturerHandler);
    this.app.put('/lecturer', updateLecturerHandler);
    this.app.delete('/lecturer', deleteLecturerHandler);
    /** Lecturer Routes */
  }
}
