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
import FormField from "../../components/common/FormField"

// Props for the SignIn component
interface SignInProps {
  authHanlder: (fields: LoginUser) => Promise<void> // Function to handle authentication, returns a promise
  isLoading: boolean // Boolean to indicate if the login request is in progress
}

const SignIn = ({ authHanlder, isLoading }: SignInProps) => {
  // Set up form handling using react-hook-form
  const {
    control, // Control object to connect fields to the form state
    handleSubmit, // Function to handle form submission
    reset, // Function to reset form values
    formState: { errors, isValid }, // Get validation errors and form validity state
  } = useForm<LoginUser>({
    mode: "all", // Validate fields on every change
    resolver: yupResolver(userLoginSchema), // Use Yup schema for validation
    defaultValues: {
      email: "", // Default value for email field
      password: "", // Default value for password field
    },
  })

  // Function to handle form submission
  const onSubmit: SubmitHandler<LoginUser> = async e => {
    // Call authHanlder to handle login and reset the form after it's done
    authHanlder(e).finally(() => {
      // Remove focus from the active element (e.g., button) after submission
      const activeElement = document.activeElement as HTMLElement
      if (activeElement) {
        (activeElement as HTMLElement).blur()
      }
      reset() // Reset form values to default
    })
  }

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)} // Submit handler for the form
      component="form" // Render as a form element
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

          <FormField<LoginUser>
            control={control} 
            errors={errors} 
            name="email" 
            label="Email" 
          />

          <FormField<LoginUser>
            control={control} 
            errors={errors} 
            name="password" 
            label="Password" 
            password 
          />

          <Button
            disabled={!isValid || isLoading} // Disable button if form is not valid or loading is in progress
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
