/*
  Warnings:

  - You are about to drop the column `isin` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Company` table. All the data in the column will be lost.
  - Added the required column `about` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_isin_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "isin",
DROP COLUMN "type",
ADD COLUMN     "about" TEXT NOT NULL;
