import { Router } from "express";
import {
  getOrderDetails,
  getUserOrders,
  placeOrder,
  rateOrder,
  updateOrderStatus,
} from "../controllers/order-controller.js";

export const orderRouter = Router();

orderRouter.post("/", placeOrder);
orderRouter.get("order-details/:id", getOrderDetails);
orderRouter.get("/user-orders", getUserOrders);
orderRouter.patch("/rate-order/:id", rateOrder);
orderRouter.patch("/update-payment-status/:id", updateOrderStatus);
orderRouter.patch("/update-order-status/:id", updateOrderStatus);
