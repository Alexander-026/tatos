import type { NextFunction, Request, Response } from "express"
import type { RegRegisterBody } from "../../types/user"
import userService from "../../services/user.service"

const registerUserC = async (
  req: Request<{}, {}, RegRegisterBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userData = await userService.register(req.body, res)

    res.status(201).json(userData)
  } catch (error) {
    next(error)
  }
}

export default registerUserC
