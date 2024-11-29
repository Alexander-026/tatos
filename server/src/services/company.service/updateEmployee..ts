import companyDto from "../../dtos/companyDto";
import ApiError from "../../exceptions/apiError";
import Company from "../../models/company.model";
import User from "../../models/user.model";
import type { ICompany, UpdateEmployeeBody } from "../../types/company";

const updateEmployee = async ({
  employees,
  companyId,
}: {
  companyId: string;
  employees: UpdateEmployeeBody[];
}): Promise<{ updatedCompany: ICompany; message: string }> => {
  // Find the company by its ID
  const company = await Company.findById(companyId);

  // If the company does not exist, throw an error
  if (!company) {
    throw new Error("Failed to update company");
  }

  // Fetch all existing users to validate email uniqueness
  const existingUsers = await User.find();
  const existingEmails = new Set(existingUsers.map((user) => user.email));

  // Create an array of update operations
  const operations = await Promise.all(
    employees.map(async (employee) => {
      // Fetch the existing user by their ID
      const existingUser = await User.findById(employee.id);

      // Skip this operation if the user does not exist
      if (!existingUser) {
        throw ApiError.BadRequest(`the user does not exist`)
      }

      // Check if the email has changed and if it already exists
      if (
        employee.email &&
        employee.email !== existingUser.email &&
        existingEmails.has(employee.email)
      ) {
        throw ApiError.BadRequest(`email ${employee.email} is already in use`) // Skip the update if the new email is already in use
      }

      // Prepare the update data object for partial updates
      const updateData: Partial<UpdateEmployeeBody> = {};
      for (const key of Object.keys(
        employee
      ) as (keyof UpdateEmployeeBody)[]) {
        if (key === "id") continue; // Skip the "id" field, it is not updated

        // Compare the values between the new data and the existing data
        if ((!!employee[key] && !!existingUser[key] && employee[key] !== existingUser[key]) || key === "birthDate") {
          updateData[key] = employee[key] as any; // Add only changed fields to updateData
        }
      }

      // If the email changes, reset the emailStatus field
      if (updateData.email && updateData.email !== existingUser.email) {
        updateData.emailStatus = "unconfirmed";
      }

      // Skip this operation if there are no changes
      if (Object.keys(updateData).length === 0) {
        throw ApiError.BadRequest(` Skip this operation if there are no changes`)
      }

      // Return the update operation for bulkWrite
      return {
        updateOne: {
          filter: { _id: employee.id }, // Find the user by their ID
          update: { $set: updateData }, // Update only the changed fields
        },
      };
    })
  );

  // Remove null operations (if the user is not found or there are no changes)
  const filteredOperations = operations.filter((op) => op !== null);

  // Perform bulkWrite to update all users in one operation
  const result = await User.bulkWrite(filteredOperations, { ordered: false });

  // Prepare the updated company data for the response
  const updatedCompany = companyDto(company);

  // Return the updated company and a success message
  return {
    updatedCompany,
    message: `Successfully updated ${result.modifiedCount} employees`,
  };
};

export default updateEmployee;
