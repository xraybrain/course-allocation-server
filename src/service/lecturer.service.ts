import { Lecturer, PrismaClient } from '@prisma/client';
import Feedback from '../models/Feedback';
import Pagination from '../models/Pagination';
const prisma = new PrismaClient();

const transformQualifications = (
  qualifications: number[],
  lecturerId: number
): any[] => {
  return qualifications.map((id) => ({
    qualifyId: id,
    lecturerId,
  }));
};

export const getLecturers = async (
  page = 1,
  query: string | undefined
): Promise<Feedback> => {
  let feedback = new Feedback();
  let filter = {};
  try {
    if (query) {
      filter = {
        where: {
          OR: [
            { firstname: { contains: query } },
            { lastname: { contains: query } },
          ],
        },
      };
    }

    let totalItems = await prisma.lecturer.count(filter);
    let pagination = new Pagination(totalItems, page);
    let lecturers = await prisma.lecturer.findMany({
      take: pagination.pageSize,
      skip: pagination.offset,
      ...filter,
      include: {
        qualifications: {
          include: { qualification: true },
        },
      },
    });
    feedback.results = lecturers;
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

export const addLecturer = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    let lecturerData: Lecturer = data.lecturer;
    let emailExists = await prisma.lecturer.findFirst({
      where: { email: lecturerData.email },
    });

    if (emailExists) {
      feedback.message = 'email already exists.';
      feedback.success = false;
    } else {
      let { id } = await prisma.lecturer.create({ data: lecturerData });
      let qualifications = transformQualifications(data.qualifications, id);
      await prisma.lecturerQualification.createMany({ data: qualifications });

      let lecturer = await prisma.lecturer.findFirst({
        where: { id },
        include: { qualifications: { include: { qualification: true } } },
      });
      feedback.result = lecturer;
    }
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const updateLecturer = async (data: any): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    await prisma.lecturer.update({
      data,
      where: { id: data.id },
    });
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};

export const deleteLecturer = async (id: number): Promise<Feedback> => {
  let feedback = new Feedback();
  try {
    await prisma.lecturer.delete({
      where: { id },
    });
  } catch (error: any) {
    console.log(error);
    feedback.message = error?.meta?.cause || 'Server failed to process request';
    feedback.success = false;
  }
  return feedback;
};
