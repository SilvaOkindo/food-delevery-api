import { Router } from "express"
import { registerDriver, setDriveAvailability } from "../controllers/driver-controller.js"
import { verifyAuthorization, verifyDriver } from "../middleware/auth-middleware.js"

export const driverRouter = Router()

driverRouter.post("/register-driver", verifyAuthorization, registerDriver)
driverRouter.put("/set-driver-availability", verifyDriver, setDriveAvailability)