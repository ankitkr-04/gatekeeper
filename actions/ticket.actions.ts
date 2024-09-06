"use server";

export const generateBarCodeNumber = async (
  visitDate: Date
): Promise<string> => {
  const visitDateStr = visitDate.toISOString().split("T")[0].replace(/-/g, "");
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const barcodeNumber = `MUS-${visitDateStr}-${randomNumber}`;
  return barcodeNumber;
};

export const getTicket = async (ticketId: string) => {
  try {
    const ticketDetails = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    return ticketDetails ? ticketDetails : null;
  } catch (error: any) {
    return error;
  }
};

export const getTicketByBarcode = async (barcodeNo: string) => {
  try {
    console.log("Getting ticket by barcode:", barcodeNo);

    const ticketDetails = await prisma.ticket.findUnique({
      where: {
        barcodeNo,
      },
    });
    return ticketDetails ? ticketDetails : null;
  } catch (error: any) {
    return error;
  }
};

type TicketStatus = "BOOKED" | "USED" | "CANCELLED";

export const updateTicketStatus = async (
  ticketId: string,
  status: TicketStatus
) => {
  try {
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: status,
      },
    });
    return updatedTicket ? updatedTicket : null;
  } catch (error: any) {
    return error;
  }
};
