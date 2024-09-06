// src/pages/api/valid-date.ts

import { publicHolidays } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

const MAX_ADVANCE_DAYS = 30; // Maximum days for advance booking

export async function POST(req: NextRequest) {
  try {
    const { date } = await req.json();
    const dateToCheck = new Date(date);

    // Validate date format
    if (isNaN(dateToCheck.getTime())) {
      return NextResponse.json({
        status: 400,
        error: "Invalid date format",
      });
    }

    const today = new Date();
    const maxAdvanceDate = new Date();
    maxAdvanceDate.setDate(today.getDate() + MAX_ADVANCE_DAYS);

    // Check if the date is in the past
    if (dateToCheck < today) {
      return NextResponse.json({
        status: 400,
        message: "Cannot book for a past date.",
      });
    }

    // Check if the date exceeds the advance booking period
    if (dateToCheck > maxAdvanceDate) {
      return NextResponse.json({
        status: 400,
        message: `Cannot book more than ${MAX_ADVANCE_DAYS} days in advance.`,
      });
    }

    // Check if the date is a Sunday
    const dayOfWeek = dateToCheck.getDay(); // 0 = Sunday
    if (dayOfWeek === 0) {
      return NextResponse.json({
        status: 400,
        message: "Museum is closed on Sundays.",
      });
    }

    // Check if the date is a public holiday
    const formattedDate = dateToCheck.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const holiday = publicHolidays.find(
      (holiday) => holiday.date === formattedDate
    );

    if (holiday) {
      return NextResponse.json({
        status: 400,
        message: `Museum is closed on ${holiday.description}.`,
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Museum is open on this date and booking is available.",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
      details: error.message,
    });
  }
}
