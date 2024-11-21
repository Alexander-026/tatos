import * as yup from "yup"
import { EmployeeLimit } from "../types/company";
const userSchema = {
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Must be at least 3 characters"),
  companyName: yup
    .string()
    .required("Company name is required")
    .min(3, "Must be at least 3 characters"),
  employeeLimit: yup
    .mixed<EmployeeLimit>()
    .oneOf(Object.values(EmployeeLimit), "Invalid employee limit")
    .required("Employee limit is required")
};

export const userLoginSchema = yup
  .object({
    email: userSchema.email,
    password: userSchema.password,
  })
  .required()

export const userRegisterSchema = yup.object(userSchema).required()

const { password, ...userRegister } = userSchema

export const userUpdateSchema = yup.object({
  ...userRegister,
  oldPassword: yup
    .string()
    .test(
      "passwords-match",
      "Passwörter stimmen nicht überein",
      function (value) {
        const { repeatOldPassword } = this.parent
        const password = repeatOldPassword as string | undefined

        return password ? password === value : true
      },
    )
    .test("min length oldPassword", "mindestens 3 Zeichen", function (value) {
      return value ? value.length >= 3 : true
    }),
  repeatOldPassword: yup
    .string()
    .test(
      "passwords-match",
      "Passwörter stimmen nicht überein",
      function (value) {
        const { oldPassword } = this.parent
        const password = oldPassword as string | undefined
        return password ? password === value : true
      },
    )
    .test(
      "min length repeatOldPassword",
      "mindestens 3 Zeichen",
      function (value) {
        return value ? value.length >= 3 : true
      },
    ),
  newPassword: yup
    .string()
    .test("min length newPassword", "mindestens 3 Zeichen", function (value) {
      return value ? value.length >= 3 : true
    })
    .test(
      "new password",
      "Das neue Passwort muss sich vom alten unterscheiden",
      function (value) {
        const { oldPassword, repeatOldPassword } = this.parent
        const old = (oldPassword as string | undefined) 
        const repeatedOld = (repeatOldPassword as string | undefined)
        return (old || repeatedOld) ? old !== value && repeatedOld !== value : true
      },
    ),
})
