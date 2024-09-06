"use client";

import {
  getTicketByBarcode,
  updateTicketStatus,
} from "@/actions/ticket.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

const ScanTicketPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [scannedTicketId, setScannedTicketId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startScanning = async () => {
      const codeReader = new BrowserMultiFormatReader();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.play();
        }

        codeReader
          .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
            if (result) {
              setScannedTicketId(result.getText());
              setShowModal(true);
              codeReader.reset(); // Stop scanning after successful scan
            } else if (error && !(error instanceof NotFoundException)) {
              console.error(error);
            }
          })
          .catch((err) => console.error(err));
      } catch (err) {
        console.error("Error accessing camera:", err);
        setMessage("Error accessing camera.");
      }
    };

    if (scanning) {
      startScanning();
    } else {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scanning]);

  const handleScan = async () => {
    if (scannedTicketId) {
      try {
        console.log("Scanning ticket:", scannedTicketId);

        const ticket = await getTicketByBarcode(scannedTicketId);

        if (!ticket) {
          setMessage(`Ticket ${scannedTicketId} not found.`);
          setShowModal(false);
          return;
        }

        if (ticket.status === "USED") {
          setMessage(`Ticket ${scannedTicketId} has already been used.`);
          setShowModal(false);
          return;
        }

        await updateTicketStatus(ticket.id, "USED");
        setMessage(`Ticket ${scannedTicketId} has been marked as used.`);
        setShowModal(false);
      } catch (error) {
        console.error("Error scanning ticket:", error);
        setMessage("Error scanning ticket.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scan Ticket</h1>
      <video
        ref={videoRef}
        className="w-full h-auto border border-gray-300 mb-4"
      />
      <button
        onClick={() => setScanning(!scanning)}
        className={`px-4 py-2 rounded text-white ${
          scanning
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {scanning ? "Stop Scanning" : "Start Scanning"}
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}

      {/* Dialog for confirming the ticket status update */}
      <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Do you want to mark this ticket as used?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleScan}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Mark Used
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanTicketPage;
