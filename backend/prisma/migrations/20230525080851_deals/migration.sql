/*
  Warnings:

  - The primary key for the `submit_deal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `submit_deal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "submit_deal" DROP CONSTRAINT "submit_deal_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "submit_deal_pkey" PRIMARY KEY ("id");
