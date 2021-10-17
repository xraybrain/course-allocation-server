import { PrismaClient } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';
const prisma = new PrismaClient();

export const getQualifications = async (
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

    let totalItems = await prisma.qualification.count(filter);
    let pagination = new Pagination(totalItems, page);
    let qualifications = await prisma.qualification.findMany({
      take: pagination.pageSize,
      skip: pagination.offset,
      ...filter,
    });
    feedback.results = qualifications;
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

export const addQualification = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let exists = await prisma.qualification.findFirst({
      where: { title: data.title },
    });

    if (exists) {
      feedback.message = 'qualification already exists.';
      feedback.success = false;
    } else {
      let qualification = await prisma.qualification.create({ data });
      feedback.result = qualification;
    }
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const updateQualification = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let qualification = await prisma.qualification.update({
      data,
      where: { id: data.id },
    });
    feedback.result = qualification;
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const deleteQualification = async (id: number): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    await prisma.qualification.delete({
      where: { id },
    });
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};
