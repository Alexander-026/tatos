import type { User } from "../types/user"
import { Avatar } from "@mui/material"

type MyAvatarTypes = {
  user: Pick<User["user"], "firstName" | "lastName" | "image" | "email">
  small?: boolean
}

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toLocaleUpperCase()}${name.split(" ")[1][0].toLocaleUpperCase()}`,
  }
}

const MyAvatar = ({ user, small }: MyAvatarTypes) => {
  return (
    <Avatar
      {...stringAvatar(
        `${user.firstName || user.email} ${user.lastName || user.email}`,
      )}
      // src={`${import.meta.env.VITE_LOCAL_URL}/${user.image}`}

      sx={[
        theme => ({
          color: theme.palette.text.primary,
          ...(small ? { width: "2rem", height: "2rem", fontSize: "12px" } : {}),
        }),
      ]}
      // src={`${import.meta.env.VITE_BASE_URL}/${user.image}`}
    />
  )
}

export default MyAvatar
