/*
  Warnings:

  - You are about to alter the column `valid_till` on the `submit_deal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "submit_deal" ALTER COLUMN "valid_till" SET DATA TYPE VARCHAR(30);
