import type { NextFunction, Request, Response } from "express"
import refresh from "../../services/user.service/refresh"

const refreshUserC = async (
  req: Request<{}, {}, { refreshToken?: string }, {}> & {
    cookies: { refreshToken?: string }
  },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken: clientRefreshToken } = req.body
    const { refreshToken } = req.cookies
    const token = refreshToken || clientRefreshToken
    const userData = await refresh(token, res)
    res.status(201).json(userData)
  } catch (error) {
    next(error)
  }
}

export default refreshUserC
