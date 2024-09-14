"use client";

import { getTicket } from "@/actions/ticket.actions";
import BwipJs from "bwip-js/browser";
import { useSearchParams } from "next/navigation";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";

const ETicket = () => {
  const [ticket, setTicket] = useState<TicketProps | null>(null);
  const ticketId = useSearchParams().get("ticketId");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketId) return;

    const fetchTicketDetails = async () => {
      try {
        const ticketDetails = await getTicket(ticketId);
        setTicket(ticketDetails);
        await generatePDF(ticketDetails);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    const generateBarcode = (barcodeNo: string): Promise<HTMLCanvasElement> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        BwipJs.toCanvas(canvas, {
          bcid: "code128", // Barcode type
          text: barcodeNo, // Text to encode
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Align text to center
        });
        resolve(canvas);
      });
    };

    const generatePDF = async (ticketDetails: TicketProps) => {
      try {
        const { barcodeNo, visitDate, status, id } = ticketDetails;

        // Generate the barcode
        const barcodeCanvas = await generateBarcode(barcodeNo);
        const barcodeImageUrl = barcodeCanvas.toDataURL("image/png");

        // Create a new PDF Document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([500, 400]);
        const timesRomanFont = await pdfDoc.embedFont(
          StandardFonts.TimesRoman
        );

        // Add ticket details to PDF
        page.drawText("E-Ticket", {
          x: 200,
          y: 360,
          size: 24,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        page.drawText(`Ticket ID: ${id}`, { x: 50, y: 300, size: 12 });
        page.drawText(`Visit Date: ${visitDate}`, { x: 50, y: 280, size: 12 });
        page.drawText(`Status: ${status}`, { x: 50, y: 260, size: 12 });

        // Add barcode image to the PDF
        const pngImageBytes = await fetch(barcodeImageUrl).then((res) =>
          res.arrayBuffer()
        );
        const pngImage = await pdfDoc.embedPng(pngImageBytes);
        page.drawImage(pngImage, {
          x: 50,
          y: 150,
          width: 200,
          height: 50,
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        // Convert the PDF into a blob and create a URL
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);

        setPdfUrl(pdfUrl);
      } catch (err) {
        console.error("Error generating PDF", err);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  useEffect(() => {
    if (!pdfUrl) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "e-ticket.pdf";
    link.style.display = "none";
    document.body.appendChild(link);

    // Programmatically trigger the click event
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl); // Clean up the object URL
  }, [pdfUrl]);

  if (!ticketId) {
    return <div>Invalid ticket ID</div>;
  }

  return (
    <div>
      <h1>E-Ticket</h1>
      {ticket ? (
        <p>Your ticket ID is: {ticketId}</p>
      ) : (
        <p>Loading ticket details...</p>
      )}
    </div>
  );
};

export default ETicket;
