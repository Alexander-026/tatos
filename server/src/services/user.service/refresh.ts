import type { Response } from "express"
import userDto from "../../dtos/userDto"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"
import type { ResponseUser } from "../../types/user"
import {
  findToken,
  generateTokens,
  validateRefreshToken,
} from "../token.service/token.service"

const refresh = async (
  refreshToken: string | undefined,
  res: Response,
): Promise<ResponseUser> => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }
  const userData = validateRefreshToken(refreshToken)
  const tokenFromDB = await findToken(refreshToken)

  if (!userData || !tokenFromDB) {
    throw ApiError.InvalidRefreshToken()
  }
  const user = await User.findById(userData.id)
  if (!user) {
    throw ApiError.InvalidRefreshToken()
  }
  await user.save()
  const newUser = userDto(user)
  const tokens = await generateTokens({ ...newUser }, res)

  return { ...tokens, user: newUser }
}

export default refresh
