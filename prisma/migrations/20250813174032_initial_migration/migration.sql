-- CreateEnum
CREATE TYPE "public"."Item" AS ENUM ('STATIONERY', 'FOOD', 'TICKETS', 'PURIFIED_WATER', 'GROCERY', 'TRANSPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."QuestStatus" AS ENUM ('POSTED', 'CLAIMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(12) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quest" (
    "id" TEXT NOT NULL,
    "item" "public"."Item" NOT NULL,
    "details" TEXT,
    "reward" INTEGER,
    "destination" VARCHAR(255),
    "deadline" TIMESTAMP(3),
    "status" "public"."QuestStatus" NOT NULL DEFAULT 'POSTED',
    "posterId" TEXT,
    "claimerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Quest" ADD CONSTRAINT "Quest_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quest" ADD CONSTRAINT "Quest_claimerId_fkey" FOREIGN KEY ("claimerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
