import type { NextFunction, Request, Response } from "express"
import type { ReqCompanyUpdateBody } from "../../types/company"
import companyService from "../../services/company.service"

const updateCompanyC = async (
  req: Request<{ id: string }, {}, ReqCompanyUpdateBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {

    const {companyFileds, employeeFields} = req.body
    let resultUpdateCompany;
    let resultUpdateEmployee
    if(companyFileds) {
      resultUpdateCompany = await companyService.updateCompany(
        req.params.id,
        companyFileds,
      )
    }
    if(employeeFields) {
      resultUpdateEmployee = await companyService.updateEmployee(
        req.params.id,
        employeeFields
      );
    }
   
    res.status(200).json({...resultUpdateCompany, ...resultUpdateEmployee})
  } catch (error) {
    next(error)
  }
}

export default updateCompanyC
