import type { IUser } from "../../types/user"
import type { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import Token from "../../models/token.model"
import type { Document } from "mongoose"
import type { IGeneratedTokens, IToken } from "../../types/token"
import type { Response } from "express"

const generateTokens = async (
  user: IUser,
  res: Response,
): Promise<IGeneratedTokens> => {
  const accessToken = jwt.sign(
    { ...user },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "24h",
    },
  )
  const refreshToken = jwt.sign(
    { ...user },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    },
  )

  await saveToken(user.id, refreshToken)

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production" ? "None" : 'Lax',
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

  return {
    accessToken,
    refreshToken,
  }
}

type TokenValidationResult = JwtPayload | IUser | null

const validateAccessToken = (token: string): TokenValidationResult => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
    return userData as { user: IUser }
  } catch (error) {
    return null
  }
}

const validateRefreshToken = (token: string): TokenValidationResult => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
    return userData as IUser
  } catch (error) {
    return null
  }
}

const saveToken = async (
  userId: string,
  refreshToken: string,
): Promise<Document | null> => {
  const tokenData = await Token.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  const token = await Token.create({ user: userId, refreshToken })
  return token
}

const removeToken = async (
  refreshToken: string,
): Promise<{ deletedCount?: number }> => {
  const tokenData = await Token.deleteOne({ refreshToken })
  return tokenData
}

const removeTokenById = async (
  userID: string,
): Promise<{ deletedCount?: number }> => {
  const tokenData = await Token.deleteOne({ user: userID })
  return tokenData
}

const findToken = async (refreshToken: string): Promise<IToken | null> => {
  const tokenData = await Token.findOne({ refreshToken })
  return tokenData
}

export {
  generateTokens,
  saveToken,
  removeToken,
  removeTokenById,
  validateAccessToken,
  validateRefreshToken,
  findToken,
}
