import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const submitDeal = async (req: Request, res: Response) => {
  const {
    companyName,
    shortDescription,
    email,
    dealsDetails,
    redeemDetails,
    dealType,
    website,
  } = req.body;

  if (!email || !dealsDetails || !redeemDetails) {
    res.status(400).json({
      message: "Please fillout the mandatory fields",
    });
    return;
  }

  try {
    let deal = await prisma.submit_deal.create({
      data: {
        company_name: companyName,
        short_description: shortDescription,
        email: email,
        deals_details: dealsDetails,
        redeem_details: redeemDetails,
        deal_type: dealType,
        website: website,
      },
    });

    if (deal) {
      res.status(201).json({
        message: "Deal created Successfully",
        deal,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating Deal",
      error: error,
    });
  }
};

export const getAllDeals = (req: Request, res: Response) => {};

export const getDealById = (req: Request, res: Response) => {
  // protected- show only if proof is valid
};
