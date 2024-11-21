import type { NextFunction, Request, Response } from "express";
import type { ReqUpdateEmployeeBody } from "../../types/company";
import companyService from "../../services/company.service";

const updateEmployee = async (
  req: Request<{ id: string }, {}, ReqUpdateEmployeeBody[]>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employyeData = await companyService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).json(employyeData)
  } catch (error) {
    next(error);
  }
};

export default updateEmployee;
