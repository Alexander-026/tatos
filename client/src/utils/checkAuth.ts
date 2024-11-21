import type { User } from "../types/user"
import { jwtDecode } from "jwt-decode"

export const localUser = (): User["user"] | null => {
  const data = localStorage.getItem("accessToken")

  if (data) {
    const decodedUser = jwtDecode<User["user"]>(data)
    return decodedUser
  } else {
    return null
  }
}
