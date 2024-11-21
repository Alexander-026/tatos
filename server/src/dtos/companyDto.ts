import type { CompanyModel, ICompany } from "../types/company"

const companyDto = (company: CompanyModel): ICompany => {
  return {
    id: company._id.toString(),
    directorId: company.directorId.toString(),
    name: company.name,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
    employees: company.employees.map(e => e.toString()),
    chats: company.chats.map(c => c.toString()),
    employeeLimit: company.employeeLimit,
  }
}

export default companyDto
