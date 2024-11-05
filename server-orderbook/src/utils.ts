// Utils
import { bookWithQuantitiy, Fill, orderbook } from "./orderbook";

export const getOrderId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const fillOrder = (
  orderId: string,
  price: number,
  quantity: number,
  side: "buy" | "sell",
  type?: "ioc"
): { status: "rejected" | "accepted"; executedQty: number; fills: Fill[] } => {
  const fills: Fill[] = [];
  const maxFillQuantity = getFillAmount(price, quantity, side);
  let executedQty = 0;

  if (type === "ioc" && maxFillQuantity < quantity) {
    return { status: "rejected", executedQty: maxFillQuantity, fills: [] };
  }
  if (side === "buy") {
    if (quantity !== 0) {
      orderbook.bids.push({
        price,
        quantity: quantity,
        side: "bid",
        orderId,
      });
    }
  } else {
    if (quantity !== 0) {
      orderbook.asks.push({
        price,
        quantity: quantity,
        side: "ask",
        orderId,
      });
      bookWithQuantitiy.asks[price] =
        (bookWithQuantitiy.asks[price] || 0) + quantity;
    }
  }
  return { status: "accepted", executedQty, fills };
};

function getFillAmount(
  price: number,
  quantity: number,
  side: "buy" | "sell"
): number {
  let filled = 0;
  if (side === "buy") {
    orderbook.asks.forEach((o) => {
      if (o.price < price) {
        filled += Math.min(quantity, o.quantity);
      }
    });
  } else {
    orderbook.bids.forEach((o) => {
      if (o.price > price) {
        filled += Math.min(quantity, o.quantity);
      }
    });
  }
  return filled;
}
