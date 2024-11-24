import companyDto from "../../dtos/companyDto";
import Company from "../../models/company.model";
import type { ICompany, ReqCompanyUpdateBody } from "../../types/company";

// Function to update a company's details
const updateCompany = async ({
  idCompany,
  fieldsToUpdate,
}: {
  idCompany: string; // The ID of the company to update
  fieldsToUpdate: ReqCompanyUpdateBody["companyFileds"]; // An object containing the fields to update
}): Promise<{ message: string; updatedCompany: ICompany }> => {
  // Find the company by its ID and update the specified fields
  const updatedCompany = await Company.findByIdAndUpdate(
    idCompany, // The ID of the company to find
    { $set: fieldsToUpdate }, // The fields to update with new values
    {
      new: true, // Return the updated document instead of the original
      runValidators: true, // Ensure the updated fields comply with the schema's validation rules
    }
  );

  // If no company was found, throw an error
  if (!updatedCompany) {
    throw new Error("Failed to update company");
  }

  // Convert the company data to a DTO format and return it
  return {
    updatedCompany: companyDto(updatedCompany),
    message: "Company field(s) have been updated successfully",
  };
};

export default updateCompany;
