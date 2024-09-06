"use server";
import prisma from "@/lib/prisma";

export const getHolidays = async (pageNumber: number, pageSize: number) => {
  const holidays = await prisma.holiday.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    orderBy: {
      date: "asc",
    },
  });

  const total = await prisma.holiday.count();
//   console.log(holidays);

  return { holidays, total };
};
