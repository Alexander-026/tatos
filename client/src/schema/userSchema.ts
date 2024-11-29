import * as yup from "yup"
import { EmployeeLimit } from "../types/company"

export const userLoginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: yup
      .string()
      .required("Password is required")
  })
  .required()

export const userRegisterSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email address is required"),
    companyName: yup
      .string()
      .required("Company name is required")
      .min(3, "Must be at least 3 characters"),
    employeeLimit: yup
      .mixed<EmployeeLimit>()
      .oneOf(Object.values(EmployeeLimit), "Invalid employee limit")
      .default(EmployeeLimit.level1),
    password: yup
      .string()
      .required("Password is required")
      .test(
        "password-strength",
        "",
        value =>
          !!value &&
          /[A-Z]/.test(value) && 
          /[0-9]/.test(value) && 
          /[\W_]/.test(value), 
      ).min(8, "Must be at least 8 characters"),
    repeatPassword: yup
      .string()
      .test("passwords-match", "Passwords do not match", function (value) {
        const { password } = this.parent
        password as string | undefined
        return password ? password === value : true
      })
      .required("Repeat Password is required")
  })
  .required()
