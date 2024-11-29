import express from "express"
import userController from "../controllers/user.controller"
import {
  authMiddleWare,
  authorizeDirector,
} from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/registration", userController.registerUserC)
router.post("/login", userController.loginUserC)
router.post("/logout", userController.logoutC)
router.post(
  "/setConfirmMailer",
  authMiddleWare,
  userController.sendConfirmationEmailC,
)
router.get("/confirmEmail/:activationId", userController.confirmEmailC)
router.post("/refresh", userController.refreshUserC)
router.put(
  "/update",
  authMiddleWare,
  authorizeDirector,
  userController.updateUserC,
)

export default router
