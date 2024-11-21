import mongoose from "mongoose"
import Company from "../../models/company.model"
import type {
  CompanyModel,
  ICompany,
  ReqRemoveEmployeeBody,
} from "../../types/company"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"
import companyDto from "../../dtos/companyDto"

const removeEmployee = async (
  regRemoveEmployeeBody: ReqRemoveEmployeeBody & { companyId: string },
): Promise<{ message: string; updatedCompany: ICompany }> => {
  const { companyId, userIds } = regRemoveEmployeeBody
  // Convert userIds to an array of ObjectIds to work correctly with MongoDB
  const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id))

  // Get a list of emails of users that will be deleted
  const usersToDelete = await User.find(
    { _id: { $in: objectIds } },
    { email: 1 },
  )

  if (usersToDelete.length === 0) {
    throw ApiError.BadRequest("Employee(s) not found")
  }
  const emailsToDelete = usersToDelete.map(user => user.email)

  // Remove users from the users collection
  const result = await User.deleteMany({ _id: { $in: objectIds } })

  // Проверяем, прошла ли операция успешно
  if (!result.acknowledged) {
    throw ApiError.BadRequest(
      "The deletion was not confirmed. The operation was not performed.",
    )
  }

  // Remove users from the employees array in the company
  const company = (await Company.findByIdAndUpdate(
    companyId,
    { $pull: { employees: { $in: objectIds } } }, // Remove all employees from the employees array
    { new: true },
  )) as CompanyModel

  if (!company) {
    throw ApiError.BadRequest("Company not found")
  }

  const emailList = emailsToDelete.join(",")
  const message = `
  ${emailList} 
  employees have been successfully deleted.
  `

  const updatedCompany = companyDto(company)

  return { message, updatedCompany }
}

export default removeEmployee
