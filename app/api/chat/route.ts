// app/api/chat/route.ts
import client from "@/lib/botpress";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const { messages } = await client.listMessages({});

    // Assuming the last message is the bot's response
    const botReply =
      messages[messages.length - 1]?.text || "No response from bot";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch response from Botpress" },
      { status: 500 }
    );
  }
}
