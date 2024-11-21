import type { NextFunction, Response } from "express"
import companyService from "../../services/company.service"
import type { AuthenticatedRequest } from "../../types/user"

const getMyCompaniesC = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.user
    const companies = await companyService.getMyPompanies(user?.id)
    res.status(200).json(companies)
  } catch (error) {
    next(error)
  }
}

export default getMyCompaniesC
