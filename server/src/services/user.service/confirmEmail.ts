import type { EmailStatus } from "../../types/user"
import userDto from "../../dtos/userDto"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"

const confirmEmailService = async (
  userId: string,
): Promise<{ emailStatus: EmailStatus }> => {
  const user = await User.findById(userId)
  if (!user) {
    throw ApiError.BadRequest(`Activator not found`)
  }

  if (user.emailStatus === "confirmed") {
    throw ApiError.BadRequest(`already confirmed`)
  }

  user.emailStatus = "confirmed"
  const savedUser = await user.save()
  const activatedUser = userDto(savedUser)
  const emailStatus = activatedUser.emailStatus

  return { emailStatus }
}

export default confirmEmailService
