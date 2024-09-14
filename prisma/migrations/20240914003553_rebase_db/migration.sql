/*
  Warnings:

  - You are about to drop the column `ticketTypeId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookedBy` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[conversationId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessories` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookedBy` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessoryCost` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adultCost` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `childCost` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniorCost` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Museum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Museum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_museumId_fkey";

-- DropForeignKey
ALTER TABLE "TicketType" DROP CONSTRAINT "TicketType_museumId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "ticketTypeId",
ADD COLUMN     "accessories" INTEGER NOT NULL,
ADD COLUMN     "bookedBy" TEXT NOT NULL,
ADD COLUMN     "conversationId" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "visitDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Museum" ADD COLUMN     "accessoryCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "adultCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "childCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "seniorCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "bookedBy",
DROP COLUMN "email";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "TicketType";

-- CreateTable
CREATE TABLE "Holiday" (
    "id" TEXT NOT NULL,
    "museumId" TEXT,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holiday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_conversationId_key" ON "Booking"("conversationId");

-- AddForeignKey
ALTER TABLE "Holiday" ADD CONSTRAINT "Holiday_museumId_fkey" FOREIGN KEY ("museumId") REFERENCES "Museum"("id") ON DELETE SET NULL ON UPDATE CASCADE;
