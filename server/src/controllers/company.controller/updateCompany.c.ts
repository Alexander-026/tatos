import type { NextFunction, Request, Response } from "express";
import type { ReqCompanyUpdateBody } from "../../types/company";
import companyService from "../../services/company.service";

const updateCompanyC = async (
  req: Request<{ id: string }, {}, Partial<ReqCompanyUpdateBody>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Destructure and extract fields from the request body
    const { companyFileds, employeeFields, newEmployees, removedEmployees } =
      req.body;

    // Prepare an array to accumulate the messages
    const messages: string[] = [];

    // Prepare response containers for various operations
    const responseData: Record<string, any> = {};

    // Array to hold all async operation functions
    const operations: (() => Promise<void>)[] = [];

    // Update company fields if provided
    if (companyFileds) {
      operations.push(async () => {
        const resultUpdateCompany = await companyService.updateCompany({
          idCompany: req.params.id,
          fieldsToUpdate: companyFileds,
        });
        responseData.resultUpdateCompany = resultUpdateCompany;
        if (resultUpdateCompany?.message) {
          messages.push(resultUpdateCompany.message);
        }
        console.log("1")
      });
    }

    // Update employee fields if provided
    if (employeeFields?.length) {
      operations.push(async () => {
        const resultUpdateEmployee = await companyService.updateEmployee({
          companyId: req.params.id,
          employees: employeeFields,
        });

        responseData.resultUpdateEmployee = resultUpdateEmployee;
        if (resultUpdateEmployee?.message) {
          messages.push(resultUpdateEmployee.message);
        }
      });
    }

    // Remove employees if provided
    if (removedEmployees?.length) {
      operations.push(async () => {
        const resultRemovedEmployees = await companyService.removeEmployee({
          companyId: req.params.id,
          userIds: removedEmployees,
        });
        responseData.resultRemovedEmployees = resultRemovedEmployees;
        if (resultRemovedEmployees?.message) {
          messages.push(resultRemovedEmployees.message);
        }
        console.log("3")
      });
    }

    // Add new employees if provided
    if (newEmployees?.length) {
      operations.push(async () => {
        const resultNewEmployees = await companyService.addEmployee({
          companyId: req.params.id,
          candidateEmployees: newEmployees,
        });
        responseData.resultNewEmployees = resultNewEmployees;
        if (resultNewEmployees?.message) {
          messages.push(resultNewEmployees.message);
        }
        console.log("4")
      });
    }

    // Execute all operations sequentially using for...of loop
    for (const operation of operations) {
      await operation();
    }

    // Construct and send the response
    res.status(200).json({
      ...responseData,
      message: messages.filter(Boolean).join(", "),
    });
  } catch (error) {
    // Pass any error to the error-handling middleware
    next(error);
  }
};

export default updateCompanyC;
