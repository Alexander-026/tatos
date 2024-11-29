import type { FieldValues, UseFormGetValues } from "react-hook-form"
import type { IFormCompany, CompanyUpdateBodyTypes, AddEmployeeBody } from "../../../types/company"
import type { UpdatedFileds } from "./FormCompany"
import findNewFields from "../../../utils/findNewFields"

interface SubmitCompanyFormParams {
  form: IFormCompany; // The form data object containing current form values
  dirtyFields: FieldValues; // Tracks which fields have been modified (FieldValues type from react-hook-form)
  employees: IFormCompany['employees']; // Array of employees initially provided
  getValues: UseFormGetValues<IFormCompany>; // Function to get the current form values
  removedIds: string[] // all deleted employee IDs
}

// Function to handle form submission
const submitCompanyForm =  ({
  form,
  dirtyFields,
  employees,
  getValues,
  removedIds
}: SubmitCompanyFormParams): Partial<CompanyUpdateBodyTypes>  | null => {
  let updateCompanyBody: Partial<CompanyUpdateBodyTypes> = {}

  // Get only updated fields to create an update request
  const companyFileds: UpdatedFileds = findNewFields(form, dirtyFields)

  if (Object.keys(companyFileds).length) {
    console.log("companyFileds", companyFileds)
    updateCompanyBody = {
      ...companyFileds,
    }
  }
  // Filter out newly added employees that do not have an ID yet (identified by `id === "new"`)
  const newEmployees: AddEmployeeBody[] = getValues()
    .employees.filter(emp => emp.id === "new")
    .map(emp => ({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      role: emp.role,
      password: emp.password!, // Non-null assertion since password is mandatory for new employees
      birthDate: emp.birthDate,
      image: emp.image,
    }))

  if (newEmployees.length) {
    updateCompanyBody = {
      ...updateCompanyBody,
      newEmployees,
    }
  }

  // Check if employees have been removed by comparing current and default employee lists
  if (removedIds.length) {

      console.log("removedIds", removedIds)
    updateCompanyBody = {
      ...updateCompanyBody,
      removedEmployees: removedIds,
    }
  }


  return  Object.keys(updateCompanyBody).length ? updateCompanyBody : null
}

export default submitCompanyForm
