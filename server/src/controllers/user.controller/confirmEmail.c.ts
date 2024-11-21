import type { NextFunction, Request, Response } from "express"

import userService from "../../services/user.service"

const confirmEmailC = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id
    const emailStatus = await userService.confirmEmailService(userId)
    res.status(200).json(emailStatus)
  } catch (error) {
    next(error)
  }
}

export default confirmEmailC
