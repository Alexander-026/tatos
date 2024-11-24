import updateCompanyC from "./updateCompany.c"
import getCompanyC from "./getCompany.c"
import getMyCompaniesC from "./getMyCompanies.c"

const companyController = {
  updateCompanyC,
  getCompanyC,
  getMyCompaniesC,
} as const

export default companyController
