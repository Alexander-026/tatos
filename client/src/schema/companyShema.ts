import * as yup from "yup"
import { EmployeeLimit } from "../types/company"
import { EmailStatus, UserRole } from "../types/user"

const companySchema = yup
  .object({
    name: yup
      .string()
      .required("Company name is required")
      .min(3, "Must be at least 3 characters"),
    employeeLimit: yup
      .mixed<EmployeeLimit>()
      .oneOf(Object.values(EmployeeLimit), "Invalid employee limit")
      .required("Employee limit is required"),
    employees: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required("Employee ID is required"),
          firstName: yup
            .string()
            .min(3, "Must be at least 3 characters")
            .default("First name is required"),
          lastName: yup
            .string()
            .min(3, "Must be at least 3 characters")
            .required("Last name is required"),
          birthDate: yup.string().default(""),
          email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
          password:  yup
          .string(),
          emailStatus: yup
            .mixed<EmailStatus>()
            .oneOf(
              Object.values(EmailStatus),
              "Invalid email status",
            )
            .required(),
          image: yup.string().default(""),
          role: yup
            .mixed<UserRole>()
            .oneOf(Object.values(UserRole), "Invalid Employee role")
            .required(),
        }),
      )
      .required()
      .default([]),
  })
  .required()

export default companySchema
