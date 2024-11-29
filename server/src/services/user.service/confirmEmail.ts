import type { EmailStatus } from "../../types/user"
import userDto from "../../dtos/userDto"
import ApiError from "../../exceptions/apiError"
import User from "../../models/user.model"

const confirmEmailService = async (
  activationId: string,
): Promise<{ emailStatus: EmailStatus }> => {
  const user = await User.findOne({ activationId })
  if (!user) {
    throw ApiError.BadRequest(`Activator not found`)
  }

  if (user.emailStatus === "confirmed") {
    throw ApiError.BadRequest(`Already confirmed`)
  }

  user.emailStatus = "confirmed"
  user.activationId = null
  const savedUser = await user.save()
  const activatedUser = userDto(savedUser)
  const emailStatus = activatedUser.emailStatus

  return { emailStatus }
}

export default confirmEmailService
