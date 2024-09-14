"use client";

import { getMuseums } from "@/actions/museums.actions";
import Pagination from "@/components/shared/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Museum } from "@prisma/client";
import { useEffect, useState } from "react";

const MuseumTable = () => {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isNext, setIsNext] = useState(true);

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const data = await getMuseums(pageNumber);
        setMuseums(data);
        setIsNext(data.length === 10);
      } catch (error) {
        console.error("Failed to fetch museums:", error);
      }
    };

    fetchMuseums();
  }, [pageNumber]);

  return (
    <div className="text-light900_dark100 rounded-lg p-4">
      <Table className="w-full">
        <TableHeader className="">
          <TableRow className="h3-bold">
            <TableHead className="text-dark100_light900">Name</TableHead>
            <TableHead className="text-dark100_light900">Location</TableHead>
            <TableHead className="text-dark100_light900">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {museums.map((museum) => (
            <TableRow key={museum.id} className="">
              <TableCell className="text-dark300_light700">
                {museum.name}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {museum.city}
              </TableCell>
              <TableCell className="text-dark300_light700">
                {museum.description}
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

export default MuseumTable;
