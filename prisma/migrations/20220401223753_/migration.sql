/*
  Warnings:

  - You are about to drop the column `facebook` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "facebook",
DROP COLUMN "instagram",
ADD COLUMN     "github" TEXT,
ADD COLUMN     "website" TEXT;
