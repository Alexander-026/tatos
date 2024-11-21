import mongoose from "mongoose"
import companyDto from "../../dtos/companyDto"
import ApiError from "../../exceptions/apiError"
import Company from "../../models/company.model"
import User from "../../models/user.model"
import type { CompanyModel, ICompany, IFullCompany } from "../../types/company"
import userDto from "../../dtos/userDto"

const getCompany = async (companyId: string): Promise<IFullCompany> => {
  const companyData = await Company.findById(companyId) 
  if (!companyData) {
    throw ApiError.BadRequest(`Company not found`)
  }

  const employeeIds = companyData.employees.map(id => new mongoose.Types.ObjectId(id));
  const employeesDoc =  await User.find({ _id: { $in: employeeIds } });

  const company = companyDto(companyData)
  const  employees = employeesDoc.map((employee) => userDto(employee))
  return {
    company,
    employees
  }
}

export default getCompany
