import express from "express"
import {dbConnect} from "./config/db-connect.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.json({message: "Food api"})
})

// database connection
dbConnect()

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log("Server running on port: ", PORT)
})