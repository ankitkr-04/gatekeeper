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
        return ticketDetails;
    } catch (error: any) {
        return error;
    }
}
