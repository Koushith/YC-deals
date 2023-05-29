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

export const getAllDeals = async (req: Request, res: Response) => {
  try {
    const allDeals = await prisma.submit_deal.findMany();
    res.status(200).json({
      message: "All Deals",
      allDeals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. couldnt fetch all deals",
      error: error,
    });
  }
};

export const getDealById = async (req: Request, res: Response) => {
  //todo- protected- show only if proof is valid

  const dealId = req.params.id;
  console.log("Deal id", dealId);

  try {
    if (!dealId) {
      res.status(500).json({
        message: "ID is requred",
      });
      return;
    }

    // todo- show this only if status === 'verified'

    const query = await prisma.submit_deal.findFirst({
      where: {
        id: parseInt(dealId),
      },
    });

    if (query) {
      res.status(200).json({
        message: "Deal",
        deal: query,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fectching",
      error,
    });
  }
};
