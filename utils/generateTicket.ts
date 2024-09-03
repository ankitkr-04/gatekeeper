import BwipJs from "bwip-js/node";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export function createTicket(user: any, booking: any) {
  //use uuid to generate a unique ticket id
  const ticketId = `${user.id}-${booking.id}`;

  const ticketDate = {
    ticketId,
    user: user.id,
    booking: booking.id,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return ticketDate;
}

export async function generateTicket(ticketId: string) {
  try {
    // Step 1: Create a new PDF Document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);

    // Step 2: Set up fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 24;

    // Step 3: Add text to the PDF
    page.drawText("E-Ticket", {
      x: 150,
      y: 550,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Ticket ID: ${ticketId}`, {
      x: 50,
      y: 500,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });

    // Step 4: Generate a barcode using bwip-js
    const barcodeBuffer = await new Promise<Buffer>((resolve, reject) => {
      BwipJs.toBuffer(
        {
          bcid: "code128", // Barcode type
          text: ticketId, // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: false, // Show human-readable text
          textxalign: "center", // Always good to set this
        },
        (err, png) => {
          if (err) {
            reject(err);
          } else {
            resolve(png);
          }
        }
      );
    });

    // Step 5: Embed the barcode image in the PDF
    const barcodeImage = await pdfDoc.embedPng(barcodeBuffer);
    page.drawImage(barcodeImage, {
      x: 50,
      y: 400,
      width: 300,
      height: 100,
    });

    // Step 6: Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(
      process.cwd(),
      "public",
      "tickets",
      `${ticketId}.pdf`
    );
    fs.writeFileSync(filePath, pdfBytes);

    console.log(`E-ticket generated: ${filePath}`);
  } catch (error) {
    console.error("Error generating e-ticket:", error);
    throw error;
  }
}
