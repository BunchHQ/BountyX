/*
  Warnings:

  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[endpoint]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,endpoint]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpoint` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keysAuth` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keysP256dh` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Subscription_userId_key";

-- AlterTable
ALTER TABLE "public"."Subscription" DROP CONSTRAINT "Subscription_pkey",
DROP COLUMN "data",
DROP COLUMN "id",
ADD COLUMN     "endpoint" TEXT NOT NULL,
ADD COLUMN     "keysAuth" TEXT NOT NULL,
ADD COLUMN     "keysP256dh" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_endpoint_key" ON "public"."Subscription"("endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_endpoint_key" ON "public"."Subscription"("userId", "endpoint");
