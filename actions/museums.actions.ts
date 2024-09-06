"use server";
import prisma from "@/lib/prisma";

export const getMuseums = async (page: number) => {
  const data = await prisma.museum.findMany({
    skip: (page - 1) * 10,
    take: 10,
    orderBy: {
      id: "asc",
    },
  });

  return data;
};

export const getMuseumName = async (id: string) => {
  const data = await prisma.museum.findUnique({
    where: {
      id,
    },
  });

  return data?.name;
};
