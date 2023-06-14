/*
  Warnings:

  - Added the required column `valid_till` to the `submit_deal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submit_deal" ADD COLUMN     "valid_till" DATE NOT NULL;
