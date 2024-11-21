import type { UserModel, IUser } from "../types/user"

const userDto = (user: UserModel): IUser => {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthDate: user.birthDate,
    role: user.role,
    image: user.image,
    wasOnline: user.wasOnline,
    emailStatus: user.emailStatus,
  }
}

export default userDto
