import jwt from "jsonwebtoken"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"
import { removeToken } from "../token.service/token.service"
import type { IUser } from "../../types/user"

const logout = async (refreshToken: string | undefined): Promise<IUser> => {
  if (!refreshToken) {
    throw ApiError.BadRequest(`User not found`)
  }

  const decodedUser = (await jwt.decode(refreshToken)) as IUser
  if (!decodedUser) {
    throw ApiError.BadRequest(`User not found`)
  }

  const user = await User.findById(decodedUser.id)

  if (!user) {
    throw ApiError.BadRequest(`User not found`)
  }

  user.wasOnline = new Date(Date.now())
  await user.save()

  await removeToken(refreshToken)
  return decodedUser
}

export default logout
