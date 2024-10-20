import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  findDefaultAddress,
  getUserDefaultAddress,
  setDefaultAddress,
  updateAddress,
} from "../controllers/address-controller.js";
import { verifyAuthorization } from "../middleware/auth-middleware.js";

export const addressRouter = Router();

addressRouter.post("/add-address", verifyAuthorization, addAddress);
addressRouter.delete("/delete-address/:id", verifyAuthorization, deleteAddress);
addressRouter.get("/default-address", verifyAuthorization, findDefaultAddress);
addressRouter.put("/update-address/:id", verifyAuthorization, updateAddress);
addressRouter.patch(
  "/set-default-address/:id",
  verifyAuthorization,
  setDefaultAddress
);
addressRouter.get(
  "/user-default-address",
  verifyAuthorization,
  getUserDefaultAddress
);
