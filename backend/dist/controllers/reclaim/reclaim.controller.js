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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postStatus = exports.getStatus = exports.home = void 0;
const validators_1 = require("../../utils/validators");
const client_1 = require("@prisma/client");
const reclaim_sdk_1 = require("@reclaimprotocol/reclaim-sdk");
const fs_1 = __importDefault(require("fs"));
const CALLBACK_URL = process.env.CALLBACK_URL + "/" + "callback/";
const CALLBACK_ID_PREFIX = "bookface-";
const prisma = new client_1.PrismaClient();
const reclaim = new reclaim_sdk_1.reclaimprotocol.Reclaim();
const { generateUuid } = reclaim_sdk_1.reclaimprotocol.utils;
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log("body- email");
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
    var _a;
    if (!req.params.id) {
        res.status(400).send(`400 - Bad Request: callbackId is required`);
        return;
    }
    if (!req.body) {
        res.status(400).send(`400 - Bad Request: body is required`);
        return;
    }
    try {
        let reqBody;
        reqBody = JSON.parse(decodeURIComponent(req.body));
        console.log("parsed req body", reqBody);
        if (!reqBody.proofs || !reqBody.proofs.length) {
            res.status(400).send(`400 - Bad Request: proofs are required`);
            return;
        }
        const callbackId = req.params.id;
        console.log("callback id-------", callbackId);
        const proofs = reqBody.proofs;
        console.log("prooofs--------", proofs);
        let first = proofs[0];
        const stringToNumberConversion = Number((_a = first === null || first === void 0 ? void 0 : first.parameters) === null || _a === void 0 ? void 0 : _a.userId);
        const finalProof = [...proofs, { parameters: { "userId": stringToNumberConversion } }];
        console.log("str conversion", stringToNumberConversion);
        console.log("final prood", finalProof);
        // Writing proofs array to a local file
        fs_1.default.writeFile("proofs.json", finalProof, (err) => {
            if (err) {
                res.status(500).send(`Failed to write proofs to file: ${err}`);
                return;
            }
            console.log("Proofs written to file");
        });
        // verify the proof
        const isValidProofs = yield reclaim.verifyCorrectnessOfProofs(finalProof);
        console.log("isValid??", isValidProofs);
        if (!isValidProofs) {
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
