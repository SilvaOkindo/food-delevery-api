import { Router } from "express";
import {
  addFoodAdditives,
  addFoodTags,
  createFoodItem,
  deleteFoodItem,
  foodAvailability,
  getAllFoodItems,
  getFoodItemById,
  getFoodItemsByRestaurant,
  getRandomFoodItems,
  getRandomFoodItemsByCodesAndCategory,
  updateFoodItem,
} from "../controllers/food-controller.js";

export const foodRouter = Router();

foodRouter.get("/", getAllFoodItems);
foodRouter.get("/by-id/:id", getFoodItemById);
foodRouter.get("/by-restaurant/:id", getFoodItemsByRestaurant);
foodRouter.get("/random-foods/:code", getRandomFoodItems);
foodRouter.get(
  "/random-by-code-and-category/:code/:category",
  getRandomFoodItemsByCodesAndCategory
);
foodRouter.post("/", createFoodItem);
foodRouter.put("/update-food/:id", updateFoodItem);
foodRouter.patch("/toggle-availability/:id", foodAvailability);
foodRouter.delete("/delete-food/:id", deleteFoodItem);
foodRouter.post("/additives/:id", addFoodAdditives);
foodRouter.post("/tags", addFoodTags);
