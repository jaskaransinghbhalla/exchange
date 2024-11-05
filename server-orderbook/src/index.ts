// Imports
import { getOrderId, fillOrder } from "./utils";
import { OrderInputSchema } from "./types";
import express from "express";

const PORT = 3000;
const BASE_ASSET = "BTC";
const QUOTE_ASSET = "USD";

let GLOBAL_TRADE_ID: number = 0;

const app = express();
app.use(express.json());

app.post("/api/v1/order", (req, res) => {
  const order = OrderInputSchema.safeParse(req.body);
  if (!order.success) {
    res.status(400).send(order.error.message);
    return;
  }

  const { baseAsset, quoteAsset, price, quantity, side, kind } = order.data;
  const orderId = getOrderId();

  if (baseAsset !== BASE_ASSET || quoteAsset !== QUOTE_ASSET) {
    res.status(400).send("Invalid base or quote asset");
    return;
  }

  const { executedQty, fills } = fillOrder(
    orderId,
    price,
    quantity,
    side,
    kind
  );
  res.send({
    orderId,
    executedQty,
    fills,
  });
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
});
