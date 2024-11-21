import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"

const errorHandler: ErrorRequestHandler = ((
  err,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    res.status(400).json({ error: "Invalid JSON" })
    return
  }
  next()
}) as ErrorRequestHandler

export default errorHandler
