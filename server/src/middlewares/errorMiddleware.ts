import type { Request, Response, NextFunction } from "express"
import ApiError from "../exceptions/apiError"

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(err)

  if (err instanceof ApiError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    })
    return // Добавляем return, чтобы явно завершить выполнение функции
  }

  res.status(500).json({ message: "Unexpected error" })
}

export default errorMiddleware
