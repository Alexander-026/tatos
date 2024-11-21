import bcrypt from "bcryptjs"
import userDto from "../../dtos/userDto"
import User from "../../models/user.model"
import { generateTokens } from "../token.service/token.service"
import type { ResponseUser, RegRegisterBody } from "../../types/user"
import ApiError from "../../exceptions/apiError"
import Company from "../../models/company.model"
import type { Response } from "express"
import sendConfirmationEmail from "./sendConfirmationEmail"

const register = async (
  reqRegisterBody: RegRegisterBody,
  res: Response,
): Promise<ResponseUser> => {
  const { email, password, employeeLimit, companyName } = reqRegisterBody
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw ApiError.BadRequest(`User with email address ${email} already exists`)
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "Director",
  })

  const companyExist = await Company.findOne({ name: companyName })
  if (companyExist) {
    throw ApiError.BadRequest(
      `A company with the name ${companyName} already exists`,
    )
  }
  await Company.create({
    directorId: user._id,
    name: companyName,
    employeeLimit,
  })
  const newUser = userDto(user)
  const tokens = await generateTokens({ ...newUser }, res)
  await sendConfirmationEmail({ id: newUser.id, myEmail: email })
  return { ...tokens, user: newUser }
}

export default register
