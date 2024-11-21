import addEmployee from "./addEmployee"
import getCompany from "./getCompany"
import getMyPompanies from "./getMyPompanies"
import removeEmployee from "./removeEmployee"
import updateCompany from "./updateCompany"
import updateEmployee from "./updateEmployee."

const companyService = {
  addEmployee,
  removeEmployee,
  getCompany,
  updateCompany,
  getMyPompanies,
  updateEmployee
} as const

export default companyService
