"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reclaim_sdk_1 = require("@reclaimprotocol/reclaim-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const reclaim_controller_1 = require("./controllers/reclaim/reclaim.controller");
const deals_controller_1 = require("./controllers/deals/deals.controller");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const { generateUuid } = reclaim_sdk_1.reclaimprotocol.utils;
//Reclaim related routes
app.post("/home", reclaim_controller_1.home);
app.get("/status/:callbackId", reclaim_controller_1.getStatus);
//RN related routes
app.use(express_1.default.text({ type: "*/*" }));
app.post("/callback/:id", reclaim_controller_1.postStatus);
//Deals Related
app.post("/deals/submit-deal", deals_controller_1.submitDeal);
app.get("/deals", deals_controller_1.getAllDeals);
app.get("/deals/:id", deals_controller_1.getDealById);
//server starter
app.get("/", (req, res) => {
    res.send(`This route works!!!`);
});
app.listen(PORT, () => {
    console.log(`Server is running on PORT - ${PORT}`);
});
