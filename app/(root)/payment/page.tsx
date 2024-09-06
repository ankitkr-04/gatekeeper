"use client";

import { getBookingDetails } from "@/actions/booking.actions";
import { getOrderDetails } from "@/actions/payment.actions";
import ErrorCard from "@/components/Error";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Payment = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [booking, setBooking] = useState<any | null>(null); // Adjust type as necessary
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID found. Please try again.");
      setLoading(false);
      return;
    }

    const fetchOrderAndBookingDetails = async () => {
      try {
        // Fetch order details
        const orderDetails = await getOrderDetails(orderId);

        // Fetch booking details (if required)
        const bookingDetails = await getBookingDetails(orderId);
        setBooking(bookingDetails);

        // Load Razorpay script and initiate payment
        await loadRazorpayScript();
        initiatePayment(orderDetails);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndBookingDetails();
  }, [orderId]);

  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("razorpay-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Razorpay script."));
      document.body.appendChild(script);
    });
  };

  const initiatePayment = (order: any) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded.");
      setError("Failed to load payment processor.");
      return;
    }

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key
      amount: order.amount * 100, // Amount in paise
      currency: order.currency,
      name: "MuseoBot",
      description: "Order Payment",
      order_id: order.id,
      handler: function (response: any) {
        console.log("Payment Success:", response);
        // Handle payment success here
      },
      prefill: {
        name: booking?.bookedBy || "Customer Name",
        email: booking?.email || "customer@example.com",
        contact: booking?.phone || "not provided",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <ErrorCard desc={error} />}
          {/* Optionally render other content or messages */}
        </>
      )}
    </div>
  );
};

export default Payment;
