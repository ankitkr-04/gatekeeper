import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extract data from the request body
    const payload = await req.json();
    
    // Extract the payment and order entities from the payload
    const payment = payload.payload.payment.entity;
    const order = payload.payload.order.entity;

    // Validate the event
    if (payload.event !== 'order.paid') {
      return NextResponse.json(
        { success: false, error: "Invalid event type" },
        { status: 400 }
      );
    }

    // Verify the payment signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(payment.order_id + "|" + payment.id);
    const digest = shasum.digest("hex");

    if (digest !== payload.headers['x-razorpay-signature']) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Fetch the booking based on the Razorpay order ID
    const booking = await prisma.booking.findFirst({
      where: { orderId: order.order_id },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update booking status to COMPLETED
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "COMPLETED",
        transactionId: payment.id,
      },
    });

    await prisma.ticket.create({
      data: {
        bookingId: booking.id,
        status: "BOOKED",
        visitDate: booking.visitDate,
        barcodeNo: "BARCODE123",
      },
    });

    

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, error: "Error processing webhook" },
      { status: 500 }
    );
  }
}
