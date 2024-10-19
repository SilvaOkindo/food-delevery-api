import { Router } from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user-controller.js"
import { verifyAuthorization, verifyToken } from "../middleware/auth-middleware.js"


export const userRouter = Router()

userRouter.get("/",  getAllUsers)
userRouter.get("/:id", getUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)