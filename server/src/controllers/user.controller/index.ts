import registerUserC from "./registerUser.c"
import loginUserC from "./loginUser.c"
import updateUserC from "./updateUser.c"
import refreshUserC from "./refreshUser.c"
import sendConfirmationEmailC from "./sendConfirmationEmail.c"
import confirmEmailC from "./confirmEmail.c"
import logoutC from "./logout.c"

const userController = {
  registerUserC,
  loginUserC,
  updateUserC,
  refreshUserC,
  confirmEmailC,
  sendConfirmationEmailC,
  logoutC,
} as const

export default userController
