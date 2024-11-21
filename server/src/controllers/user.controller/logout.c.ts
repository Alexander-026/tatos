import type { NextFunction, Response, Request } from "express"
import userService from "../../services/user.service"

const logoutC = async (
  req: Request<{}, {}, { refreshToken?: string }, {}> & {
    cookies: { refreshToken?: string }
  },
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken
    const companies = await userService.logout(refreshToken)
    res.clearCookie("refreshToken");
    res.status(200).json(companies)
  } catch (error) {
    next(error)
  }
}

export default logoutC
