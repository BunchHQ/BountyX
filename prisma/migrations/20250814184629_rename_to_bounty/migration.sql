/*
  Warnings:

  - You are about to drop the `Quest` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."BountyStatus" AS ENUM ('OFFERED', 'CLAIMED', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."Quest" DROP CONSTRAINT "Quest_claimerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quest" DROP CONSTRAINT "Quest_posterId_fkey";

-- DropTable
DROP TABLE "public"."Quest";

-- DropEnum
DROP TYPE "public"."QuestStatus";

-- CreateTable
CREATE TABLE "public"."Bounty" (
    "id" TEXT NOT NULL,
    "item" "public"."Item" NOT NULL,
    "details" TEXT,
    "reward" INTEGER,
    "destination" VARCHAR(255),
    "deadline" TIMESTAMP(3),
    "status" "public"."BountyStatus" NOT NULL DEFAULT 'OFFERED',
    "posterId" TEXT,
    "claimerId" TEXT,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Bounty" ADD CONSTRAINT "Bounty_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bounty" ADD CONSTRAINT "Bounty_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
