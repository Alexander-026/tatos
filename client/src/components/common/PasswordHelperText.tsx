import { Stack, Typography } from "@mui/material"
import { FaCheck } from "react-icons/fa"
import { MdError } from "react-icons/md"

const PasswordHelperText = ({ password }: { password: string }) => {
  const minLengthTest = password.length >= 8
  const lowercaseTest = /[a-z]/.test(password)
  const uppercaseTest = /[A-Z]/.test(password)
  const numberTest = /\d/.test(password)
  const specialCharTest = /[!@#$%^&?]/.test(password)

  return (
    <Stack  sx={{ py: "0.5rem" }}>
      <Typography
        data-testid={
          minLengthTest ? "minLengthTest-success" : "minLengthTest-error"
        }
        fontSize={12}
        color={minLengthTest ? "green" : "red"}
      >
        {minLengthTest ? <FaCheck /> : <MdError />} Must be at least 8
        characters long.
      </Typography>
      <Typography
        data-testid={
          lowercaseTest ? "lowercaseTest-success" : "lowercaseTest-error"
        }
        fontSize={12}
        color={lowercaseTest ? "green" : "red"}
      >
        {lowercaseTest ? <FaCheck /> : <MdError />} Must contain a lowercase
        letter.
      </Typography>
      <Typography
        data-testid={
          uppercaseTest ? "uppercaseTest-success" : "uppercaseTest-error"
        }
        fontSize={12}
        color={uppercaseTest ? "green" : "red"}
      >
        {uppercaseTest ? <FaCheck /> : <MdError />} Must contain an uppercase
        letter.
      </Typography>
      <Typography
        data-testid={numberTest ? "numberTest-success" : "numberTest-error"}
        fontSize={12}
        color={numberTest ? "green" : "red"}
      >
        {numberTest ? <FaCheck /> : <MdError />} Must contain a number.
      </Typography>
      <Typography
        data-testid={specialCharTest ? "specialCharTest-success" : "specialCharTest-error"}
        fontSize={12}
        color={specialCharTest ? "green" : "red"}
      >
        {specialCharTest ? <FaCheck /> : <MdError />} Must contain a special
        character (!@#$%^&?).
      </Typography>
    </Stack>
  )
}

export default PasswordHelperText
