-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VERIFIED', 'PENDING', 'FAILED');

-- CreateTable
CREATE TABLE "pgmigrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "run_on" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pgmigrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yc_deals" (
    "id" SERIAL NOT NULL,
    "callback_id" VARCHAR(1000) NOT NULL,
    "proofs" TEXT,
    "status" "Status" NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "template_id" VARCHAR(200) NOT NULL,
    "template_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "yc_deals_pkey" PRIMARY KEY ("id")
);
