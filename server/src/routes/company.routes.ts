import express from "express"
import {
  authMiddleWare,
  authorizeDirector,
} from "../middlewares/authMiddleware"
import companyController from "../controllers/company.controller"

const router = express.Router()



router.put(
  "/update/:id",
  authMiddleWare,
  authorizeDirector,
  companyController.updateCompanyC,
)
router.get("/getCompany/:id", authMiddleWare, companyController.getCompanyC)
router.get("/getMyCompanies", authMiddleWare, companyController.getMyCompaniesC)

export default router
