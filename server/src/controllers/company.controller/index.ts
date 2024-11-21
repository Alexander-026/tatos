import addEmployeeC from "./addEmployee.c"
import updateCompanyC from "./updateCompany.c"
import removeEmployeeC from "./removeEmployee.c"
import getCompanyC from "./getCompany.c"
import getMyCompaniesC from "./getMyCompanies.c"
import updateEmployee from "./updateEmployee.c"

const companyController = {
  addEmployeeC,
  updateCompanyC,
  getCompanyC,
  getMyCompaniesC,
  removeEmployeeC,
  updateEmployee
} as const

export default companyController
