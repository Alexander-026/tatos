class ApiError extends Error {
  status: number
  errors: any[]

  constructor(status: number, message: string, errors: any[] = []) {
    super(message)
    this.status = status
    this.errors = errors
    Object.setPrototypeOf(this, ApiError.prototype)
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, "The user is not entitled")
  }

  static UnauthorizedDirectoError(): ApiError {
    return new ApiError(401, "Not authorized as Director.")
  }

  static InvalidRefreshToken(): ApiError {
    return new ApiError(403, "Invalid Refresh Token.")
  }

  static NotFound(message: string, errors: any[] = []): ApiError {
    return new ApiError(404, message, errors)
  }

  static Conflict(message: string, errors: any[] = []): ApiError {
    return new ApiError(409, message, errors)
  }

  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(400, message, errors)
  }
}

export default ApiError
