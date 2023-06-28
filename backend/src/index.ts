import { reclaimprotocol } from "@reclaimprotocol/reclaim-sdk";

import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";

import cors from "cors";

import {
  getAllDeals,
  getDealById,
  submitDeal,
} from "./controllers/deals/deals.controller";
import {
  getStatus,
  home,
  postStatus,
} from "./controllers/reclaim/reclaim.controller";

dotenv.config();

const PORT = process.env.PORT;
//const ALLOWED_ORIGINS = ["https://dealflex.vercel.app/", "http://192.168.0.197", "http://192.168.0.197:3000/", "http://192.168.0.197:8000", "https://api.amplitude.com"];
const app: Express = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || ALLOWED_ORIGINS.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(cors())

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
