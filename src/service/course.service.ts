import { PrismaClient } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';
const prisma = new PrismaClient();

export const getCourses = async (
  page = 1,
  query: string | undefined
): Promise<Feedback> => {
  let feedback = new Feedback();
  let filter = {};
  try {
    if (query) {
      filter = {
        where: {
          title: {
            contains: query,
          },
        },
      };
    }

    let totalItems = await prisma.course.count(filter);
    let pagination = new Pagination(totalItems, page);
    let courses = await prisma.course.findMany({
      take: pagination.pageSize,
      skip: pagination.offset,
      ...filter,
    });
    feedback.results = courses;
    feedback.totalResults = totalItems;
    feedback.currentPage = page;
    feedback.totalPages = pagination.pages;
  } catch (error) {
    console.log(error);
    feedback.results = [];
    feedback.message = 'Server failed to process request.';
    feedback.success = false;
  }
  return feedback;
};

export const addCourse = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let codeExists = await prisma.course.findFirst({
      where: { code: data.code },
    });
    let titleExists = await prisma.course.findFirst({
      where: { title: data.title },
    });

    if (codeExists) {
      feedback.message = 'course code already exists.';
      feedback.success = false;
    } else if (titleExists) {
      feedback.message = 'course title already exists.';
      feedback.success = false;
    } else {
      let course = await prisma.course.create({ data });
      feedback.result = course;
    }
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const updateCourse = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let course = await prisma.course.update({
      data,
      where: { id: data.id },
    });
    feedback.result = course;
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const deleteCourse = async (id: number): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    await prisma.course.delete({
      where: { id },
    });
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};
