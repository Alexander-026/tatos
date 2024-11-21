import type{ EmployeeLimit } from "./company"
import type Tokens from "./token"

// export type UserRole = "Director" | "Manager" | "Employee"
export type EmailStatus = "unconfirmed" | "pending" | "confirmed"

export enum UserRole  {
  director = "Director",
  manager = "Manager",
  employee = "Employee",
}

export type User = Tokens & {
  user: {
    id: string
    firstName: string
    lastName: string
    birthDate: string
    email: string
    emailStatus: EmailStatus
    image: string
    role: UserRole
    wasOnline: Date
  }
}


export type RegisterUser = {
  password: string
  email: string
  employeeLimit: EmployeeLimit
  companyName: string
}

export type LoginUser = Pick<RegisterUser, "email" | "password">

