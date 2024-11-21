import { useForm } from "react-hook-form"
import type { RegisterUser } from "../../types/user"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { userRegisterSchema } from "../../schema/userSchema"
import { EmployeeLimit } from "../../types/company"
import { Button, Stack, CircularProgress } from "@mui/material"
import FormField from "../../components/common/FormField"

interface SignUpProps {
  authHanlder: (fileds: RegisterUser) => Promise<void>
  isLoading: boolean
}

const SignUp = ({ authHanlder, isLoading }: SignUpProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterUser>({
    mode: "all",
    resolver: yupResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      employeeLimit: EmployeeLimit.level1,
    },
  })
  // Form submit event handler
  const onSubmit: SubmitHandler<RegisterUser> = e => {
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
          <FormField<RegisterUser>
            control={control}
            errors={errors}
            name="email"
            label="Email"
          />
          <FormField<RegisterUser>
            control={control}
            errors={errors}
            name="companyName"
            label="Company Name"
          />

          <FormField<RegisterUser>
            control={control}
            errors={errors}
            name="employeeLimit"
            label="Employee Limit"
            type="select"
            options={Object.values(EmployeeLimit).map(value => ({
              value,
              label: value,
            }))}
          />
          <FormField<RegisterUser>
            control={control}
            errors={errors}
            name="password"
            label="Password"
            password
          />
        </>
      )}

      <Button
        disabled={!isDirty}
        variant="outlined"
        size="small"
        onClick={() => reset()}
        fullWidth
      >
        Reset
      </Button>
      <Button
        type="submit"
        disabled={!isValid}
        variant="contained"
        size="small"
        fullWidth
      >
        {isLoading ? "Loading" : "Registrieren"}
      </Button>
    </Stack>
  )
}

export default SignUp
