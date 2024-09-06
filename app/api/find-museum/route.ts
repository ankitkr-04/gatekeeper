import prisma from "@/lib/prisma"; // Assuming you have Prisma set up correctly
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const { cityName, museumName } = body;

    // Query the museums
    const museums = await prisma.museum.findMany({
      where: {
        OR: [
          {
            city: cityName, // Check the city name directly
          },
          {
            name: museumName, // Check the museum name directly
          },
        ],
      },
    });

    // Return the response in JSON format using NextResponse
    return NextResponse.json({
      status: 200,
      data: museums,
      museumFound: museums.length > 0,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: "Error finding museum",
      details: error.message,
    });
  }
}
