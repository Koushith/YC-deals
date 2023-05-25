-- CreateTable
CREATE TABLE "submit_deal" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "short_description" VARCHAR(5000) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "deals_details" VARCHAR(5000) NOT NULL,
    "redeem_details" VARCHAR(5000) NOT NULL,
    "deal_type" VARCHAR(20) NOT NULL,
    "website" VARCHAR(30) NOT NULL,

    CONSTRAINT "submit_deal_pkey" PRIMARY KEY ("id")
);
