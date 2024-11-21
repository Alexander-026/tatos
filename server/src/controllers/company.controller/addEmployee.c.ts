import type { NextFunction, Request, Response } from "express"
import type { ReqAddEmployeeBody } from "../../types/company"
import companyService from "../../services/company.service"

const addEmployeeC = async (
  req: Request<{ id: string }, {}, ReqAddEmployeeBody[]>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const updatedCompany = await companyService.addEmployee({
      newEployees:req.body,
      companyId: req.params.id,
    })
    res.status(201).json(updatedCompany)
  } catch (error) {
    next(error)
  }
}

export default addEmployeeC
