import type { User } from "./user"

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


export type CompanyContextType = {
  companyData: IFullCompany
}

export interface IFullCompany {
  company: ICompany
  employees: User["user"][]
}

export type IFormEmployee =  Omit<User["user"],  "wasOnline" > & {
  password?: string 
}

export type IFormCompany = {
  employeeLimit: EmployeeLimit
  name: string
  employees: IFormEmployee[]
}

export type UpdatedCompany = {
  updatedCompany: ICompany
  message: string
}


export type CompanyUpdateBodyTypes = {
  companyFileds: CompanyFieldsToUpdate
  employeeFields: UpdateEmployeeBody[]
  newEmployees: AddEmployeeBody[]
  removedEmployees:  string[]
}


export type ICompanyUpdateBody = {
  body:  Partial<CompanyUpdateBodyTypes>,
  companyId: string
}

export type CompanyFieldsToUpdate = Partial<
Pick<ICompany, "employeeLimit" | "name">
>

export type AddEmployeeBody = Partial<Omit<User, "id" | "wasOnline" | "emailStatus">> & {
  email: string
  password: string
}

export type UpdateEmployeeBody = Partial<Omit<User, "id" | "wasOnline">> & {
  id: string
}

export enum EmployeeLimit {
  level1 = "up to 20",
  level2 = "up to 50",
  level3 = "up to 100",
  level4 = "up to 1000",
  level5 = "more than 1000",
}

// export type RegCompanyUpdateBody = Partial<
//   Pick<ICompany, "employeeLimit" | "name">
// >

// export type RegAddEmployeeBody = Pick<RegRegisterBody, "email" | "password">
// export type RegRemoveEmployeeBody = {
//   userIds: string[]
// }
