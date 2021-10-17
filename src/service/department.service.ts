import { PrismaClient } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';
const prisma = new PrismaClient();

export const getDepartments = async (
  page = 1,
  query: string | undefined
): Promise<Feedback> => {
  let feedback = new Feedback();
  let filter = {};
  try {
    if (query) {
      filter = {
        where: {
          name: {
            contains: query,
          },
        },
      };
    }

    let totalItems = await prisma.department.count(filter);
    let pagination = new Pagination(totalItems, page);
    let departments = await prisma.department.findMany({
      take: pagination.pageSize,
      skip: pagination.offset,
      ...filter,
    });
    feedback.results = departments;
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

export const addDepartment = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let exists = await prisma.department.findFirst({
      where: { name: data.name },
    });
    console.log(exists);
    if (exists) {
      feedback.message = 'department already exists.';
      feedback.success = false;
    } else {
      let department = await prisma.department.create({ data });
      feedback.result = department;
    }
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const updateDepartment = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let department = await prisma.department.update({
      data: { name: data.name },
      where: { id: data.id },
    });
    feedback.result = department;
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const deleteDepartment = async (id: number): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    await prisma.department.delete({
      where: { id },
    });
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};
