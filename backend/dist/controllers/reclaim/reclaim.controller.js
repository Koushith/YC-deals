"use strict";
//@ts-nocheck
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
exports.postStatus = exports.getStatus = exports.home = void 0;
const validators_1 = require("../../utils/validators");
const client_1 = require("@prisma/client");
const reclaim_sdk_1 = require("@reclaimprotocol/reclaim-sdk");
const CALLBACK_URL = process.env.CALLBACK_URL + "/" + "callback/";
const CALLBACK_ID_PREFIX = "bookface-";
const prisma = new client_1.PrismaClient();
const reclaim = new reclaim_sdk_1.reclaimprotocol.Reclaim();
const { generateUuid } = reclaim_sdk_1.reclaimprotocol.utils;
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, dealID } = req.body;
    console.log("dealID", dealID);
    if (!email) {
        res.status(400).send("400- Bad Request- email is required");
        return;
    }
    const emailStr = email;
    if (!(0, validators_1.validateEmail)(emailStr)) {
        res.status(400).send("400- Bad Request- email is not valid");
        return;
    }
    try {
        const isEmailExist = yield prisma.yc_deals.findMany({
            where: {
                email: { equals: emailStr },
                status: { equals: "VERIFIED" },
            },
        });
        if (isEmailExist.length > 0) {
            res.status(200).json({
                status: 302,
                message: "Email already exist and it is verified",
                data: isEmailExist,
            });
        }
        else {
            const callbackId = CALLBACK_ID_PREFIX + generateUuid();
            const template = reclaim
                .connect("Prove that you have bookface login", [
                {
                    provider: "yc-login",
                    payload: {},
                    templateClaimId: reclaim_sdk_1.reclaimprotocol.utils.generateUuid(),
                },
            ], CALLBACK_URL)
                .generateTemplate(callbackId);
            const templateUrl = template.url;
            const templateId = template.id;
            const query = yield prisma.yc_deals.create({
                data: {
                    callback_id: callbackId,
                    email: emailStr,
                    template_id: templateId,
                    template_url: templateUrl,
                    status: "PENDING",
                },
            });
            res.status(200).json({
                url: query.template_url,
                callbackId: query.callback_id,
            });
        }
    }
    catch (error) {
        res.status(500).send(`Some error occured ${error}`);
    }
});
exports.home = home;
const getStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const callbackId = req.params.callbackId;
    if (!callbackId) {
        res.status(400).send("400 -Bad Request. callback id id required");
    }
    try {
        const query = yield prisma.yc_deals.findFirst({
            where: {
                callback_id: callbackId,
            },
        });
        if (!query) {
            res.status(404).send("404- Callback id not found");
            return;
        }
        res.status(200).send({
            callbackId: query === null || query === void 0 ? void 0 : query.callback_id,
            status: query === null || query === void 0 ? void 0 : query.status,
        });
    }
    catch (error) {
        res.status(500).send(`500 - Some erroor occured`);
    }
});
exports.getStatus = getStatus;
const postStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        res.status(400).send(`400 - Bad Request: callbackId is required`);
        return;
    }
    console.log("id", req.params.id);
    if (!req.body) {
        res.status(400).send(`400 - Bad Request: body is required`);
        return;
    }
    try {
        let reqBody;
        reqBody = JSON.parse(decodeURIComponent(req.body));
        if (!reqBody.proofs || !reqBody.proofs.length) {
            res.status(400).send(`400 - Bad Request: proofs are required`);
            return;
        }
        const callbackId = req.params.id;
        const proofs = reqBody.proofs;
        // verify the proof
        const isValidProofs = yield reclaim.verifyCorrectnessOfProofs([first]);
        console.log("isValid??", isValidProofs);
        if (!isValidProofs) {
            yield prisma.yc_deals.update({
                where: {
                    callback_id: callbackId,
                },
                data: {
                    status: "FAILED",
                },
            });
            res.status(400).send(`Bad requests. Invalid proofs`);
            return;
        }
        const record = yield prisma.yc_deals.findFirst({
            where: {
                callback_id: callbackId,
            },
        });
        if (!record) {
            res.status(404).send("Callback id not found");
        }
        if (record) {
            yield prisma.yc_deals.update({
                where: {
                    id: record.id,
                },
                data: {
                    status: "VERIFIED",
                    proofs: JSON.stringify(proofs),
                },
            });
        }
        //send email after verification
        let transporter = nodemailer.createTransport({
            host: "gmail",
            auth: {
                user: "",
            },
        });
        res.send(`<div
	style="
	  width: 100%;
	  height: 100%;
	  display: flex;
	  text-align: center;
	  justify-content: center;
	  align-items: center;
	"
  >
	<h1>
	  verified!! you can avail the exclusive deals!!
	</h1>
  </div>`);
    }
    catch (error) {
        res.status(500).send(`Some error occured ${error}`);
    }
});
exports.postStatus = postStatus;
