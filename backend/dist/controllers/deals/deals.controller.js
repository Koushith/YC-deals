"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDealById = exports.getAllDeals = exports.submitDeal = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const submitDeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, shortDescription, email, dealsDetails, redeemDetails, dealType, website, } = req.body;
    if (!email || !dealsDetails || !redeemDetails) {
        res.status(400).json({
            message: "Please fillout the mandatory fields",
        });
        return;
    }
    try {
        let deal = yield prisma.submit_deal.create({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong while creating Deal",
            error: error,
        });
    }
});
exports.submitDeal = submitDeal;
const getAllDeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeals = yield prisma.submit_deal.findMany();
        res.status(200).json({
            message: "All Deals",
            allDeals,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong. couldnt fetch all deals",
            error: error,
        });
    }
});
exports.getAllDeals = getAllDeals;
const getDealById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const query = yield prisma.submit_deal.findFirst({
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
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong while fectching",
            error,
        });
    }
});
exports.getDealById = getDealById;
