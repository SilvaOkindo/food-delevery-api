import express from "express"
import {dbConnect} from "./config/db-connect.js"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth-routes.js"
import { userRouter } from "./routes/user-routes.js"
import { restaurantRouter } from "./routes/restaurant-routes.js"
import { categoryRouter } from "./routes/category-routes.js"
import { foodRouter } from "./routes/food-routes.js"
import { cartRouter } from "./routes/cart-routes.js"
import { addressRouter } from "./routes/address-routes.js"

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.json({message: "Food api"})
})

// middleware
app.use(express.json())

// auth routes
app.use("/api/v1/auth", authRouter)

// user routes
app.use("/api/v1/users", userRouter)

// restaurant routes
app.use("/api/v1/restaurants", restaurantRouter)

// category routes    
app.use("/api/v1/categories", categoryRouter)

// food routes
app.use("/api/v1/foods", foodRouter)

// cart routes
app.use("/api/v1/cart", cartRouter)

//address routes
app.use("/api/v1/address", addressRouter)

// database connection
dbConnect()

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log("Server running on port: ", PORT)
})