import type { Document } from "mongoose"
import type mongoose from "mongoose"
import type { IUser, RegRegisterBody } from "./user"

export type CompanyModel = Document &
  Omit<ICompany, "directorId" | "employees" | "chats"> & {
    _id: mongoose.Types.ObjectId
    directorId: mongoose.Types.ObjectId
    employees: mongoose.Types.ObjectId[]
    chats: mongoose.Types.ObjectId[]
  }

export interface ICompany {
  id: string
  directorId: string
  name: string
  createdAt: Date
  updatedAt: Date
  employees: string[]
  chats: string[]
  employeeLimit: EmployeeLimit
}

export interface IFullCompany {
  company: ICompany
  employees: IUser[]
}

export enum EmployeeLimit {
  level1 = "up to 20",
  level2 = "up to 50",
  level3 = "up to 100",
  level4 = "up to 1000",
  level5 = "more than 1000",
}


export type ReqCompanyUpdateBody = {
  companyFileds: CompanyFieldsToUpdate
  employeeFields: UpdateEmployeeBody[]
  newEmployees: AddEmployeeBody[]
  removedEmployees:  string[]
}


export type CompanyFieldsToUpdate = Partial<
Pick<ICompany, "employeeLimit" | "name">
>

export type AddEmployeeBody = Partial<Omit<IUser, "id" | "wasOnline" | "emailStatus">> & {
  email: string
  password: string
}

export type UpdateEmployeeBody = Partial<Omit<IUser, "id" | "wasOnline">> & {
  id: string
}
export type RemoveEmployeeBody = {
  userIds: string[]
}
