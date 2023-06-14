//@ts-nocheck

import { Request, Response } from "express";
import { validateEmail } from "../../utils/validators";
import { PrismaClient } from "@prisma/client";
import { Proof, reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

const CALLBACK_URL = process.env.CALLBACK_URL! + "/" + "callback/";
const CALLBACK_ID_PREFIX = "bookface-";

const prisma = new PrismaClient();
const reclaim = new reclaimprotocol.Reclaim();
const { generateUuid } = reclaimprotocol.utils;

export const home = async (req: Request, res: Response) => {
  const { email, dealID } = req.body;

  console.log("dealID", dealID);

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
    const isEmailExist = await prisma.yc_deals.findMany({
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
    } else {
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
    }
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

    if (!reqBody.proofs || !reqBody.proofs.length) {
      res.status(400).send(`400 - Bad Request: proofs are required`);
      return;
    }

    const callbackId = req.params.id;
    const proofs = reqBody.proofs as Proof[];

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
