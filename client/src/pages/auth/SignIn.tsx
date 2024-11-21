import {
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { userLoginSchema } from "../../schema/userSchema"
import type { SubmitHandler } from "react-hook-form"
import type { LoginUser } from "../../types/user"
import FormFiled from "../../components/common/FormField"

interface SignInProps {
  authHanlder: (fileds: LoginUser) => Promise<void>
  isLoading: boolean
}

const SignIn = ({ authHanlder, isLoading }: SignInProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginUser>({
    mode: "all",
    resolver: yupResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginUser> = async e => {
    authHanlder(e).finally(() => {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        ;(activeElement as HTMLElement).blur()
      }
      reset()
    })
  }

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        width: "100%",
        height: "100%",
      }}
      autoComplete="off"
      direction="column"
      alignItems={"center"}
      justifyContent={"center"}
      gap={{ xs: 2, sm: 3 }}
    >
   

      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Typography variant="h5" textAlign="center">
            Sign In
          </Typography>
          <FormFiled<LoginUser>
            control={control}
            errors={errors}
            name="email"
            label="Email"
          />
          <FormFiled<LoginUser>
            control={control}
            errors={errors}
            name="password"
            label="Password"
            password
          />
          <Button
            disabled={!isValid || isLoading}
            variant="contained"
            size="small"
            type="submit"
            fullWidth
          >
            {isLoading ? "Loading" : "Sign in"}
          </Button>
        </>
      )}
    </Stack>
  )
}

export default SignIn
