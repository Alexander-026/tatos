import bcrypt from "bcryptjs"
import userDto from "../../dtos/userDto"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"
import type { RegLoginBody, ResponseUser } from "../../types/user"
import { generateTokens, saveToken } from "../token.service/token.service"
import type { Response } from "express"

const login = async (
  reqLoginBody: RegLoginBody,
  res: Response,
): Promise<ResponseUser> => {
  const { email, password } = reqLoginBody
  const user = await User.findOne({ email })
  if (!user) {
    throw ApiError.BadRequest(`Password or email was entered incorrectly`)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw ApiError.BadRequest(`Password or email was entered incorrectly`)
  }

  const newUser = userDto(user)
  newUser.wasOnline = user.wasOnline
  const tokens = await generateTokens({ ...newUser }, res)
  return { ...tokens, user: newUser }
}

export default login
