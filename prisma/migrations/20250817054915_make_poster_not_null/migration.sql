/*
  Warnings:

  - Made the column `posterId` on table `Bounty` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Bounty" DROP CONSTRAINT "Bounty_posterId_fkey";

-- AlterTable
ALTER TABLE "public"."Bounty" ALTER COLUMN "posterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Bounty" ADD CONSTRAINT "Bounty_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
