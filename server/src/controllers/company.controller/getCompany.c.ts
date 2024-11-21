import type { NextFunction, Request, Response } from "express"
import companyService from "../../services/company.service"

const getCompanyC = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = req.params.id
    const company = await companyService.getCompany(id)
    res.status(200).json(company)
  } catch (error) {
    next(error)
  }
}

export default getCompanyC
