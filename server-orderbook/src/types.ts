import { z } from "zod";

export const OrderInputSchema = z.object({
  baseAsset: z.string(),
  quoteAsset: z.string(),
  price: z.number(),
  quantitiy: z.number(),
  type: z.enum(["market", "limit"]),
  side: z.enum(["buy", "sell"]),
  kind: z.enum(["iloc"]).optional(),
});
