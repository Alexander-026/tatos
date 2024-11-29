import type { EmployeeLimit } from "./company"
import type Tokens from "./token"

// export type UserRole = "Director" | "Manager" | "Employee"
export enum EmailStatus {
  unconfirmed = "unconfirmed",
  pending = "pending",
  confirmed = "confirmed",
}

export enum UserRole {
  director = "Director",
  manager = "Manager",
  employee = "Employee",
}

export enum UserRoleForm {
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
    wasOnline: string
  }
}

export type RegisterUser = {
  password: string
  repeatPassword: string
  email: string
  employeeLimit: EmployeeLimit
  companyName: string
}

export type LoginUser = Pick<RegisterUser, "email" | "password">
