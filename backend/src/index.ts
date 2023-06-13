import express, { Express, Request, Response } from "express";
import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";
import dotenv from "dotenv";
import cors from "cors";
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

const PORT = process.env.PORT ;
const app: Express = express();

app.use(express.json());
app.use(cors());


//Reclaim related routes
app.post("/home", home);
app.get("/status/:callbackId", getStatus);

//Deals Related
app.post("/deals/submit-deal", submitDeal);
app.get("/deals", getAllDeals);
app.get("/deals/:id", getDealById);

//RN related routes
app.use(express.text({ type: "*/*" }));
app.post("/callback/:id", postStatus);

//server starter
app.get("/", (req: Request, res: Response) => {
  res.send(`This route works---!!!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
});
