/*
  Warnings:

  - You are about to drop the column `slug` on the `Card` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Card_slug_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "slug",
ALTER COLUMN "bio" DROP NOT NULL;
