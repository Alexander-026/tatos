import { useForm } from "react-hook-form"
import type { RegisterUser } from "../../types/user"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { userRegisterSchema } from "../../schema/userSchema"
import { EmployeeLimit } from "../../types/company"
import { Button, Stack, CircularProgress, Typography } from "@mui/material"
import FormField from "../../components/common/FormField"
import { useEffect } from "react"

interface SignUpProps {
  authHanlder: (fileds: RegisterUser) => Promise<void>
  isLoading: boolean
}

const SignUp = ({ authHanlder, isLoading }: SignUpProps) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterUser>({
    mode: "all",
    resolver: yupResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      companyName: "",
      employeeLimit: EmployeeLimit.level1,
    },
  })

  const passwordValue = watch("password")

  useEffect(() => {
    if (getValues().repeatPassword) {
      trigger("repeatPassword") // Перевалидация repeatPassword при изменении password
    }
  }, [getValues, passwordValue, trigger])
  // Form submit event handler
  const onSubmit: SubmitHandler<RegisterUser> = async e => {
    await authHanlder(e)
    const activeElement = document.activeElement as HTMLElement
    if (activeElement) {
      ;(activeElement as HTMLElement).blur()
    }
    reset()
  }

  const renderForm = () => (
    <>
      <Typography data-testid="title-signUp" variant="h6" textAlign="center">
        Sign Up
      </Typography>
      <FormField<RegisterUser> control={control} errors={errors} name="email" label="Email" />
      <FormField<RegisterUser> control={control} errors={errors} name="companyName" label="Company Name" />
      <FormField<RegisterUser>
        control={control}
        errors={errors}
        name="employeeLimit"
        label="Employee Limit"
        type="select"
        options={Object.values(EmployeeLimit).map((value) => ({ value, label: value }))}
      />
      <FormField<RegisterUser> control={control} errors={errors} name="password" label="Password" password validate />
      <FormField<RegisterUser> control={control} errors={errors} name="repeatPassword" label="Repeat Password" password />
      <Button disabled={!isDirty} variant="outlined" size="small" onClick={() => reset()} fullWidth>
        Reset
      </Button>
      <Button type="submit" disabled={!isValid} variant="contained" size="small" fullWidth>
        Sign Up
      </Button>
    </>
  );
  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{ width: "100%", height: "100%" }}
      autoComplete="off"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={{ xs: 1, sm: 2 }}
    >
      {isLoading ? (
        <CircularProgress data-testid="circular-progress" color="inherit" sx={{ height: "28rem" }} />
      ) : (
        renderForm()
      )}
    </Stack>
  );
}

export default SignUp
