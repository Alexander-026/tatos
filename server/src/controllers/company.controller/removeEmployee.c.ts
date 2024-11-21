import type { NextFunction, Request, Response } from "express"
import type { ReqRemoveEmployeeBody } from "../../types/company"
import companyService from "../../services/company.service"

const removeEmployeeC = async (
  req: Request<{ id: string }, {}, ReqRemoveEmployeeBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const employyeData = await companyService.removeEmployee({
      ...req.body,
      companyId: req.params.id,
    })
    res.status(201).json(employyeData)
  } catch (error) {
    next(error)
  }
}

export default removeEmployeeC
