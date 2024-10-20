import { Router } from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user-controller.js"
import { verifyAdmin, verifyAuthorization, verifyToken } from "../middleware/auth-middleware.js"


export const userRouter = Router()

userRouter.get("/", verifyAuthorization, getAllUsers)
userRouter.get("/:id", verifyAuthorization, getUser)
userRouter.put("/:id", verifyAdmin, updateUser)
userRouter.delete("/:id", verifyAdmin, deleteUser)