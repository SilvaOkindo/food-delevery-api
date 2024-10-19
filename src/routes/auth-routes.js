import express from "express"
import { login, registerUser } from "../controllers/auth-controller.js"

export const authRouter = express.Router()

authRouter.post("/register-user", registerUser)
authRouter.post("/login", login)