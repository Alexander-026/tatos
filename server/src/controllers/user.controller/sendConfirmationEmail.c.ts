import type { NextFunction, Response } from "express"
import type { AuthenticatedRequest } from "../../types/user"
import userService from "../../services/user.service"

const sendConfirmationEmailC = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id, email } = req.user!
    const message = await userService.sendConfirmationEmail({
      id,
      myEmail: email,
    })

    res.status(200).json(message)
  } catch (error) {
    next(error)
  }
}

export default sendConfirmationEmailC