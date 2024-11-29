import { type FieldValues } from "react-hook-form"
import type { ICompany, IFullCompany } from "../../../types/company"
import {
  EmployeeLimit,
  type IFormCompany,
  type IFormEmployee,
} from "../../../types/company"
import type { User } from "../../../types/user"
import { EmailStatus, UserRole } from "../../../types/user"

export const mockDirector: User["user"] = {
  id: "6745a48ede58c00be14436fa",
  firstName: "",
  lastName: "",
  email: "alexanderbrendin@gmail.com",
  birthDate: "",
  role: UserRole.director,
  image: "",
  wasOnline: "2024-11-26T16:19:13.452Z",
  emailStatus: EmailStatus.confirmed,
}
export const mockEmployee: User["user"] = {
  id: "6745a48ede58c00be14436fa",
  firstName: "",
  lastName: "",
  email: "alexanderbrendin@gmail.com",
  birthDate: "",
  role: UserRole.employee,
  image: "",
  wasOnline: "2024-11-26T16:19:13.452Z",
  emailStatus: EmailStatus.confirmed,
}

// Mock data for an employee, used as initial values for testing the form
export const mockFormEmployee: IFormEmployee & FieldValues = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  birthDate: "1990-01-01",
  email: "john.doe@example.com",
  emailStatus: EmailStatus.unconfirmed,
  role: UserRole.employee,
  image: "none",
}

export const mockDataEmployees: User["user"][] = [
  {
    id: "67410d6c67442f5dce90116f",
    firstName: "Oleq",
    lastName: "Brindin",
    email: "oleq@gmail.com",
    birthDate: "1965-10-26",
    role: UserRole.employee,
    image: "none",
    wasOnline: "2024-11-22T23:02:04.806Z",
    emailStatus: EmailStatus.unconfirmed,
  },
  {
    id: "67410d8867442f5dce901176",
    firstName: "Iqor",
    lastName: "Brindin",
    email: "iqor@gmail.com",
    birthDate: "1968-03-11",
    role: UserRole.employee,
    image: "none",
    wasOnline: "2024-11-22T23:02:32.392Z",
    emailStatus: EmailStatus.unconfirmed,
  },
  {
    id: "67410e1f67442f5dce901183",
    firstName: "Taisiyas",
    lastName: "Qroshixina",
    email: "taya@gmail.com",
    birthDate: "1951-07-27",
    role: UserRole.employee,
    image: "none",
    wasOnline: "2024-11-22T23:05:03.195Z",
    emailStatus: EmailStatus.unconfirmed,
  },
]

export const mockCompanyData: ICompany = {
  id: "6738c91c3deffe6ced28d851",
  directorId: "6738c91c3deffe6ced28d84e",
  name: "Tatos",
  createdAt: "2024-11-16T16:32:28.841Z",
  updatedAt: "2024-11-24T15:05:42.892Z",
  employees: [
    "67410d6c67442f5dce90116f",
    "67410d8867442f5dce901176",
    "67410e1f67442f5dce901183",
    "67410ec836b8bc8ef1a313ea",
    "674310c11fc8c6caa95133a9",
    "674340c61fc8c6caa95133c7",
  ],
  chats: [],
  employeeLimit: EmployeeLimit.level1,
}

export const mockCompany: IFullCompany = {
  company: mockCompanyData,
  employees: mockDataEmployees,
}
