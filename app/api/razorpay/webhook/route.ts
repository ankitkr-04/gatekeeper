import { getBookingDetails } from "@/actions/booking.actions";
import { generateBarCodeNumber } from "@/actions/ticket.actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: RazorpayPaymentEntity = await req.json();
    const { event, payload } = body;

    if (!["payment.captured", "payment.failed"].includes(event)) {
      return NextResponse.json(
        { status: "error", message: `Unexpected event: ${event}` },
        { status: 400 }
      );
    }

    const { order_id: orderId, id: transactionId } = payload.payment.entity;
    const booking = await getBookingDetails(orderId);

    if (!booking) {
      return NextResponse.json(
        { status: "error", message: "Booking not found" },
        { status: 404 }
      );
    }

    if (event === "payment.captured") {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "COMPLETED", transactionId },
      });

      const existingTicket = await prisma.ticket.findUnique({
        where: { bookingId: booking.id },
      });

      if (!existingTicket) {
        const barcodeNo = await generateBarCodeNumber(booking.visitDate);
        await prisma.ticket.create({
          data: {
            barcodeNo,
            bookingId: booking.id,
            status: "BOOKED",
            visitDate: booking.visitDate,
          },
        });

        // console.log(ticket);
      }
    } else if (event === "payment.failed") {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({
      status: "success",
      message: `Webhook event ${event} handled successfully`,
    });
  } catch (error) {
    console.error("Error handling Razorpay Webhook:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to handle webhook" },
      { status: 500 }
    );
  }
}
