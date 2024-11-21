import type { NextFunction, Request, Response } from "express"
import type { RegLoginBody } from "../../types/user"
import userService from "../../services/user.service"

const loginUserC = async (
  req: Request<{}, {}, RegLoginBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = await userService.login(req.body, res)
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

export default loginUserC
