import type { NextFunction, Request, Response } from "express"

import userService from "../../services/user.service"

const confirmEmailC = async (
  req: Request<{ activationId: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const activationId = req.params.activationId
    const emailStatus = await userService.confirmEmailService(activationId)
    res.status(200).json(emailStatus)
  } catch (error) {
    next(error)
  }
}

export default confirmEmailC
