import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Express = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(`This route works!!!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
});
