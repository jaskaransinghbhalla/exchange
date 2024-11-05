"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const BASE_ASSET = "BTC";
const QUOTE_ASSET = "USD";
let GLOBAL_TRADE_ID = 0;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/order", (req, res) => {
    const order = types_1.OrderInputSchema.safeParse(req.body);
    if (!order.success) {
        res.status(400).send(order.error.message);
        return;
    }
});
function getOrderId() {
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15));
}
console.log(getOrderId());
