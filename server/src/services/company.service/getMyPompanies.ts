import companyDto from "../../dtos/companyDto"
import ApiError from "../../exceptions/apiError"
import Company from "../../models/company.model"
import type { ICompany } from "../../types/company"

const getMyPompanies = async (
  userId: string | undefined,
): Promise<ICompany[]> => {

  const companies = await Company.find({
    $or: [
      { directorId: userId }, 
      { employees: userId },
    ],
  });

  if (!companies || companies.length === 0) {
    throw ApiError.BadRequest(`No companies found`)
  }

  const dtoCompanies = companies.map(c => companyDto(c))

  return dtoCompanies
}

export default getMyPompanies
