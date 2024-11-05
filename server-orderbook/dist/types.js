"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInputSchema = void 0;
const zod_1 = require("zod");
exports.OrderInputSchema = zod_1.z.object({
    baseAsset: zod_1.z.string(),
    quoteAsset: zod_1.z.string(),
    price: zod_1.z.number(),
    quantitiy: zod_1.z.number(),
    type: zod_1.z.enum(["market", "limit"]),
    side: zod_1.z.enum(["buy", "sell"]),
    kind: zod_1.z.enum(["iloc"]).optional(),
});
