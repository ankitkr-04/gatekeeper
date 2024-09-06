"use server";
import prisma from "@/lib/prisma";

import { Booking, PaymentStatus } from "@prisma/client";

export const getCompletedBookings = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<{ bookings: Booking[]; total: number }> => {
  try {
    const skip = (pageNumber - 1) * pageSize;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: {
          status: PaymentStatus.COMPLETED,
        },

        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: pageSize,
      }),
      prisma.booking.count({
        where: {
          status: PaymentStatus.COMPLETED,
        },
      }),
    ]);

    return { bookings, total };
  } catch (error) {
    console.error("Failed to fetch completed bookings:", error);
    throw error;
  }
};

export const getBookingDetails = async (orderId: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        orderId: orderId,
      },
    });

    return booking ? booking : null;
  } catch (error: any) {
    return error;
  }
};
