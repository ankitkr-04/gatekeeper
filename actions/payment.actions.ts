"use server";

import { razorpay } from "@/lib/razorpay";

export const getOrderDetails = async (orderId: string) => {
  try {
    const order = await razorpay.orders.fetch(orderId);
    return order ? order : null;
  } catch (error: any) {
    return error;
  }
};
