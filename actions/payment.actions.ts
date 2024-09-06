"use server";

import { razorpay } from "@/lib/razorpay";

export const getOrderDetails = async (orderId: string) => {
  try {
    const order = await razorpay.orders.fetch(orderId);
    return order;
  } catch (error: any) {
    return error;
  }
};
