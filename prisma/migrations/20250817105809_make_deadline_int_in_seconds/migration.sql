/*
  Warnings:

  - The `deadline` column on the `Bounty` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Bounty" DROP COLUMN "deadline",
ADD COLUMN     "deadline" INTEGER;
