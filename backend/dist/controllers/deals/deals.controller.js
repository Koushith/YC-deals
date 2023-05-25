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
const getAllDeals = (req, res) => { };
exports.getAllDeals = getAllDeals;
const getDealById = (req, res) => {
    // protected- show only if proof is valid
};
exports.getDealById = getDealById;
