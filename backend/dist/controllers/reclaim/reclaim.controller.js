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
        console.log("callback id", callbackId);
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
        console.log("template url-----", templateUrl);
        console.log("template id", templateId);
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
    console.log("route was here");
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
    if (!req.body) {
        res.status(400).send(`400 - Bad Request: body is required`);
        return;
    }
    try {
        let reqBody;
        console.log("raw request body", req.body);
        reqBody = JSON.parse(decodeURIComponent(req.body));
        console.log("parsed req body", reqBody);
        if (!reqBody.proofs || !reqBody.proofs.length) {
            res.status(400).send(`400 - Bad Request: proofs are required`);
            return;
        }
        const callbackId = req.params.id;
        console.log("callback id", callbackId);
        const proofs = reqBody.proofs;
        console.log("prooofs--------", proofs);
        // verify the proof
        const isValidProofs = yield reclaim.verifyCorrectnessOfProofs(proofs);
        console.log("isValid??", isValidProofs);
        if (!isValidProofs) {
            res.status(400).send(`Bad requests. Invalid proofs`);
            return;
        }
        // check for existing proofs
        // const existingProofs = await prisma.yc_deals.findMany({
        //   select:{
        //   }
        // })
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
const proofs = [
    {
        onChainClaimId: "3131",
        templateClaimId: "0",
        provider: "yc-login",
        parameters: { userId: "599180" },
        chainId: 420,
        ownerPublicKey: "02ab4cf725727844176b11df4402e5cad6c074b6bf67c920710053d20a95e44301",
        timestampS: "1685177974",
        witnessAddresses: ["reclaim-node.questbook.app"],
        signatures: [
            "0x85da2c2eb6a1a27c4a47b404843a8f4f5fc73c0497819df423a82562ecb8742c2aaf0e2b5e76b717a210361d78a9c5930332a7ce5c47dd531ed2001d8bdb4ae01b",
        ],
        redactedParameters: '{"userId":"******"}',
    },
];
