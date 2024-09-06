"use server";
import prisma from "@/lib/prisma";

export const getBookingDetails = async (orderId: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        orderId: orderId,
      },
    });
    return booking;
  } catch (error: any) {
    return error;
  }
};
