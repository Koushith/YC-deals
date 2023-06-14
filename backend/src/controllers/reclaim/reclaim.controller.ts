//@ts-nocheck

import express, { Express, Request, Response } from "express";
import { validateEmail } from "../../utils/validators";
import { PrismaClient } from "@prisma/client";
import { Proof, reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import fs from "fs";
import nodemailer from "nodemailer";

const CALLBACK_URL = process.env.CALLBACK_URL! + "/" + "callback/";
const CALLBACK_ID_PREFIX = "bookface-";

const prisma = new PrismaClient();
const reclaim = new reclaimprotocol.Reclaim();
const { generateUuid } = reclaimprotocol.utils;

export const home = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send("400- Bad Request- email is required");
    return;
  }

  const emailStr = email as string;

  if (!validateEmail(emailStr)) {
    res.status(400).send("400- Bad Request- email is not valid");
    return;
  }

  try {
    const callbackId = CALLBACK_ID_PREFIX + generateUuid();

    const template = reclaim
      .connect(
        "Prove that you have bookface login",
        [
          {
            provider: "yc-login",
            payload: {},
            templateClaimId: reclaimprotocol.utils.generateUuid(),
          },
        ],
        CALLBACK_URL
      )
      .generateTemplate(callbackId);

    const templateUrl = template.url;
    const templateId = template.id;

    const query = await prisma.yc_deals.create({
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
  } catch (error) {
    res.status(500).send(`Some error occured ${error}`);
  }
};

export const getStatus = async (req: Request, res: Response) => {
  const callbackId = req.params.callbackId;
  if (!callbackId) {
    res.status(400).send("400 -Bad Request. callback id id required");
  }

  try {
    const query = await prisma.yc_deals.findFirst({
      where: {
        callback_id: callbackId,
      },
    });

    if (!query) {
      res.status(404).send("404- Callback id not found");
      return;
    }
    res.status(200).send({
      callbackId: query?.callback_id,
      status: query?.status,
    });

    //test
    let transporter = nodemailer.createTransport({
      host: "smtp.mandrillapp.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "koushith@creatoros.co", // generated ethereal user
        pass: "324967c52b1886c3d096e0b9666b944e-us17", // generated ethereal password
      },
    });

    let info = transporter.sendMail(
      {
        from: "koushith@creatoros.co",
        to: "koushith97@gmail.com",
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      },
      (err) => {
        if (err) {
          console.log("couldnt send mail", err);
        }
      }
    );

    //
  } catch (error) {
    res.status(500).send(`500 - Some erroor occured`);
  }
};

export const postStatus = async (req: Request, res: Response) => {
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
    let reqBody: any;
    reqBody = JSON.parse(decodeURIComponent(req.body));
    console.log("parsed req body", reqBody);

    if (!reqBody.proofs || !reqBody.proofs.length) {
      res.status(400).send(`400 - Bad Request: proofs are required`);
      return;
    }

    const callbackId = req.params.id;

    console.log("callback id-------", callbackId);

    const proofs = reqBody.proofs as Proof[];
    console.log("prooofs--------", proofs);

    let first = proofs[0];

    console.log("first----", first);

    //---------------------------
    const stringToNumberConversion = Number(first?.parameters?.userId);
    const finalProof = [
      ...proofs,
      { parameters: { userId: stringToNumberConversion } },
    ];
    console.log("str conversion", stringToNumberConversion);
    console.log("final proof", finalProof);

    //------------------------------

    // Writing proofs array to a local file
    // fs.writeFile("proofs.json", finalProof, (err) => {
    //   if (err) {
    //     res.status(500).send(`Failed to write proofs to file: ${err}`);
    //     return;
    //   }
    //   console.log("Proofs written to file");
    // });

    // verify the proof
    const isValidProofs = await reclaim.verifyCorrectnessOfProofs([first]);
    console.log("isValid??", isValidProofs);

    if (!isValidProofs) {
      await prisma.yc_deals.update({
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

    const record = await prisma.yc_deals.findFirst({
      where: {
        callback_id: callbackId,
      },
    });

    if (!record) {
      res.status(404).send("Callback id not found");
    }

    if (record) {
      await prisma.yc_deals.update({
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
  } catch (error) {
    res.status(500).send(`Some error occured ${error}`);
  }
};
