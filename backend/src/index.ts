import express, { Express, Request, Response } from "express";
import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getStatus,
  home,
  postStatus,
} from "./controllers/reclaim/reclaim.controller";
import {
  getAllDeals,
  getDealById,
  submitDeal,
} from "./controllers/deals/deals.controller";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const { generateUuid } = reclaimprotocol.utils;

//Reclaim related routes
app.post("/home", home);
app.get("/status/:callbackId", getStatus);

//RN related routes
app.use(express.text({ type: "*/*" }));
app.post("/callback/:id", postStatus);

//Deals Related
app.post("/deals/submit-deal", submitDeal);
app.get("/deals", getAllDeals);
app.get("/deals/:id", getDealById);

//server starter
app.get("/", (req: Request, res: Response) => {
  res.send(`This route works!!!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
});
