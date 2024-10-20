import { Router } from "express"
import { createRestaurant, deleteRestaurant, getAllRestaurants, getRandomRestaurants, getRestaurant, serviceAvailability, updateRestaurant } from "../controllers/restaurant-controller.js"
import { verifyAdmin } from "../middleware/auth-middleware.js"

export const restaurantRouter = Router()

restaurantRouter.get("/", getAllRestaurants) // open
restaurantRouter.get("/by-id/:id", getRestaurant) // open
restaurantRouter.get("/random/:code", getRandomRestaurants) // open
restaurantRouter.patch("/:id", serviceAvailability) // vrendor
restaurantRouter.post("/", createRestaurant) // vendor
restaurantRouter.put("/:id", updateRestaurant) // vendor
restaurantRouter.delete("/:id", deleteRestaurant) // vendor
