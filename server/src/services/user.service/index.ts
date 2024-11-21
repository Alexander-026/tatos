import sendConfirmationEmail from "./sendConfirmationEmail"
import login from "./login"
import refresh from "./refresh"
import register from "./register"
import confirmEmailService from "./confirmEmail"
import logout from "./logout"

const userService = {
  login,
  register,
  refresh,
  logout,
  sendConfirmationEmail,
  confirmEmailService,
} as const

export default userService
