import type { Request, Response, NextFunction } from "express"
import ApiError from "../exceptions/apiError"
import { validateAccessToken } from "../services/token.service/token.service"
import type { IUser } from "../types/user"

interface AuthenticatedRequest extends Request {
  user?: IUser
}

const authMiddleWare = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      console.log("one")
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(" ")[1]
    if (!accessToken) {
      console.log("two")
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccessToken(accessToken) as IUser
    if (!userData) {
      console.log("three")
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    console.log("four")
    return next(ApiError.UnauthorizedError())
  }
}

const authorizeDirector = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role === "Director") {
    next()
  } else {
    return next(ApiError.UnauthorizedDirectoError())
  }
}

export { authMiddleWare, authorizeDirector }
