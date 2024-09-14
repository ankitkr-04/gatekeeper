"use client";

import { getHolidays } from "@/actions/holidays.actions";
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

const HolidaysTable = () => {
  const [holidays, setHolidays] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isNext, setIsNext] = useState(true);
  const pageSize = 10; // Customize the page size as needed

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const { holidays, total } = await getHolidays(pageNumber, pageSize);
        setHolidays(holidays);
        setIsNext(holidays.length === pageSize);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
      }
    };

    fetchHolidays();
  }, [pageNumber]);

  return (
    <div className="text-light900_dark100 rounded-lg p-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="h3-semibold">
            <TableHead className="text-dark100_light900">Date</TableHead>
            <TableHead className="text-dark100_light900">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holidays.map((holiday) => (
            <TableRow key={holiday.id}>
              <TableCell className="text-dark300_light700">
                {new Date(holiday.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {holiday.description}
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

export default HolidaysTable;
