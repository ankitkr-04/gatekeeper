import prisma from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      museumId,
      type,
      bookingFrom,
      numOfAdults,
      numOfChildren,
      numOfSeniors,
      paymentChannel,
      userEmail,
      userName,
      phoneNumber,
    } = body;

    const museum = await prisma.museum.findUnique({
      where: { id: museumId },
      include: { ticketTypes: true },
    });

    if (!museum) {
      return NextResponse.json(
        { success: false, error: "Museum not found" },
        { status: 404 }
      );
    }

    const ticketType = museum.ticketTypes.find(
      (tt) => tt.type.toLowerCase() === type.toLowerCase()
    );

    if (!ticketType) {
      return NextResponse.json(
        { success: false, error: "Ticket type not found" },
        { status: 404 }
      );
    }

    const totalPrice =
      numOfAdults * (ticketType.adultCost || 0) +
      numOfChildren * (ticketType.childCost || 0) +
      numOfSeniors * (ticketType.seniorCost || 0);

    const order = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const booking = await prisma.booking.create({
      data: {
        museumId,
        ticketTypeId: ticketType.id,
        numOfAdults,
        numOfChildren,
        numOfSeniors,
        totalPrice,
        status: "PENDING",
        orderId: order.id,
        paymentChannel: "Razorpay",
      },
    });

    // Construct the payment URL
    const paymentUrl = `https://checkout.razorpay.com/v1/checkout.js?key=${process.env.RAZORPAY_KEY_ID}&order_id=${order.id}`;

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        paymentUrl,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      { success: false, error: "Error initiating payment" },
      { status: 500 }
    );
  }
}
