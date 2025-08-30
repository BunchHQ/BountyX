/*
  Warnings:

  - You are about to drop the column `endpoint` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `keysAuth` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `keysP256dh` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `data` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Subscription_endpoint_key";

-- AlterTable
ALTER TABLE "public"."Subscription" DROP COLUMN "endpoint",
DROP COLUMN "keysAuth",
DROP COLUMN "keysP256dh",
DROP COLUMN "userAgent",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
