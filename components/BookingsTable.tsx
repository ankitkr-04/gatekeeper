"use client";

import { getCompletedBookings } from "@/actions/booking.actions";
import { getMuseumName } from "@/actions/museums.actions";
import Pagination from "@/components/shared/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const BookingsTable = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { bookings, total } = await getCompletedBookings(
          pageNumber,
          pageSize
        );

        // Fetch museum names
        const bookingsWithMuseumNames = await Promise.all(
          bookings.map(async (booking) => {
            const museumName = await getMuseumName(booking.museumId);
            return {
              ...booking,
              museumName,
            };
          })
        );

        setBookings(bookingsWithMuseumNames);
        setIsNext(bookings.length === pageSize);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [pageNumber]);

  return (
    <div className="text-light900_dark100 rounded-lg p-4">
      <Table className="w-full">
        <TableHeader className="">
          <TableRow className="h3-bold">
            <TableHead className="text-dark100_light900">Name</TableHead>
            <TableHead className="text-dark100_light900">Email</TableHead>
            <TableHead className="text-dark100_light900">Museum</TableHead>
            <TableHead className="text-dark100_light900">Visit Date</TableHead>
            <TableHead className="text-dark100_light900">Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="text-dark300_light700">
                {booking.bookedBy}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {booking.email}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {booking.museumName}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {new Date(booking.visitDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-dark300_light700">
                ₹{booking.totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        pageNumber={pageNumber}
        isNext={isNext}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default BookingsTable;
