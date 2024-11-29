import type { Document } from "mongoose"
import type mongoose from "mongoose"
import type { IGeneratedTokens } from "./token"
import type { EmployeeLimit } from "./company"
import type { Request } from "express"
export type UserModel = Document &
  Omit<IUser, "id"> & {
    _id: mongoose.Types.ObjectId
    activationId: null | string
    password: string
    createdAt: Date
    updatedAt: Date
  }

export type UserRole = "Director" | "Manager" | "Employee"
export type EmailStatus = "unconfirmed" | "pending" | "confirmed"

export interface IUser {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  emailStatus: "unconfirmed" | "pending" | "confirmed"
  image: string
  role: "Director" | "Manager" | "Employee"
  wasOnline: Date
}

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

export type ResponseUser = IGeneratedTokens & {
  user: IUser
}

export type RegRegisterBody = {
  email: string
  password: string
  employeeLimit: EmployeeLimit
  companyName: string
}

export type RegLoginBody = Pick<RegRegisterBody, "email" | "password">
