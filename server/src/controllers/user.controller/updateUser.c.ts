import type { NextFunction, Request, Response } from "express"
import { RegLoginBody } from "../../types/user"
import userService from "../../services/user.service"

const updateUserC = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.status(200).json("User Updated")
  } catch (error) {
    next(error)
  }
}

export default updateUserC
