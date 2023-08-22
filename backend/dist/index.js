"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const deals_controller_1 = require("./controllers/deals/deals.controller");
const reclaim_controller_1 = require("./controllers/reclaim/reclaim.controller");
dotenv_1.default.config();
const PORT = process.env.PORT;
//const ALLOWED_ORIGINS = ["https://dealflex.vercel.app/", "http://192.168.0.197", "http://192.168.0.197:3000/", "http://192.168.0.197:8000", "https://api.amplitude.com"];
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.use((0, cors_1.default)());
//Reclaim related routes
app.post("/home", reclaim_controller_1.home);
app.get("/status/:callbackId", reclaim_controller_1.getStatus);
//Deals Related
app.post("/deals/submit-deal", deals_controller_1.submitDeal);
app.get("/deals", deals_controller_1.getAllDeals);
app.get("/deals/:id", deals_controller_1.getDealById);
//RN related routes
app.use(express_1.default.text({ type: "*/*" }));
app.post("/callback/", reclaim_controller_1.postStatus);
//server starter
app.get("/", (req, res) => {
    res.send(`This route works---!!!`);
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
});
