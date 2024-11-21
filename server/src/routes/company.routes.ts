import express from "express"
import {
  authMiddleWare,
  authorizeDirector,
} from "../middlewares/authMiddleware"
import companyController from "../controllers/company.controller"

const router = express.Router()

router.post(
  "/addEmployee/:id",
  authMiddleWare,
  authorizeDirector,
  companyController.addEmployeeC,
)
router.delete(
  "/removeEmployee/:id",
  authMiddleWare,
  authorizeDirector,
  companyController.removeEmployeeC,
)
router.put(
  "/updateEmployee/:id",
  authMiddleWare,
  authorizeDirector,
  companyController.updateEmployee,
)
router.put(
  "/update/:id",
  authMiddleWare,
  authorizeDirector,
  companyController.updateCompanyC,
)
router.get("/getCompany/:id", authMiddleWare, companyController.getCompanyC)
router.get("/getMyCompanies", authMiddleWare, companyController.getMyCompaniesC)

export default router
