import { Router } from "express";
import {
  addProductToCart,
  clearCart,
  decrementProductQty,
  fetchUserCart,
  getCartCount,
  removeProductFromCart,
} from "../controllers/cart-controller.js";
import { verifyAuthorization } from "../middleware/auth-middleware.js";

export const cartRouter = Router();

cartRouter.post("/add-to-cart", verifyAuthorization, addProductToCart);
cartRouter.post("/clear-cart", clearCart);
cartRouter.get("/user-cart/:id", fetchUserCart);
cartRouter.delete("/delete-product/:id", removeProductFromCart);
cartRouter.get("/cart-count", verifyAuthorization, getCartCount);
cartRouter.post("/decrement-quantity", decrementProductQty);
