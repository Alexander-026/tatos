import Tab from "@mui/material/Tab"
import { Alert, Box, Paper, Stack } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import React from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { useAppDispatch } from "../../app/hooks"
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../app/api/userApiSlice"
import { Navigate, useNavigate } from "react-router-dom"
import { userSlice } from "../../features/user/userSlice"
import useLocalStorage from "../../hooks/useLocalStorage"
import type { LoginUser, RegisterUser, User } from "../../types/user"
import type ApiError from "../../types/errors"
import { useLazyGetMyCompaniesQuery } from "../../app/api/companyApiSlice"

const Auth = () => {
  const [value, setValue] = React.useState("1")
  const [signUp,  { isLoading: signUpLoading, error: signUpError, reset: resetSignUp }] =
    useRegisterMutation()
  const [signIn, { isLoading: signInLoading, error: signInError, reset: resetSignIn }] =
    useLoginMutation()
  const [getCompanies, { isLoading, error }] = useLazyGetMyCompaniesQuery()
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const { onUser } = userSlice.actions
  // Hook for working with local storage
  const [accessToken, setToken] = useLocalStorage("accessToken")
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken")
  const [companyId, setCompanyId] = useLocalStorage("companyId")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    resetSignUp()
    resetSignIn()
  }

  const authHandler = async (authorized: User) => {
    dispath(onUser(authorized.user))
    setToken(authorized.accessToken)
    setRefreshToken(authorized.refreshToken)
  }

  const signUpHanler = async (fields: RegisterUser) => {
    const registeredUser = await signUp(fields).unwrap()
    await authHandler(registeredUser)
    const companies = await getCompanies().unwrap()

    if (companies?.length === 1) {
      const companyId = companies[0].id
      setCompanyId(companyId)
      navigate(`/company`, { replace: true })
    }
  }

  const signInHandler = async (fields: LoginUser) => {
    console.log("signInHandler", fields)
    const loggedUser = await signIn(fields).unwrap()
    await authHandler(loggedUser)
    const companies = await getCompanies().unwrap()

    if (companies?.length === 1) {
      const companyId = companies[0].id
      setCompanyId(companyId)
      navigate(`/company`, { replace: true })
    }
  }

  if (accessToken && refreshToken && companyId)
    return <Navigate to="/company" replace />

  return (
    <Stack
      sx={[theme => ({ backgroundColor: theme.palette.background.paper })]}
      justifyContent={"center"}
      alignItems="center"
      height={"100vh"}
    >
      <Paper sx={{ width: "25rem" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                disabled={signUpLoading || signInLoading}
                label="Sign In"
                value="1"
              />
              <Tab
                disabled={signUpLoading || signInLoading}
                label="Sign Up"
                value="2"
              />
            </TabList>
          </Box>
          {[signUpError, signInError, error].map(
            (err, index) =>
              err && (
                <Alert severity="error" key={index}>
                  {(err as ApiError).data.message}
                </Alert>
              ),
          )}
          <TabPanel sx={{ height: "28rem" }} value="1">
            <SignIn
              isLoading={signInLoading || isLoading}
              authHanlder={(fileds: LoginUser) => signInHandler(fileds)}
            />
          </TabPanel>
          <TabPanel sx={{ minHeight: "28rem", }} value="2">
            <SignUp
              isLoading={signUpLoading || isLoading}
              authHanlder={(fields: RegisterUser) => signUpHanler(fields)}
            />
          </TabPanel>
        </TabContext>
      </Paper>
    </Stack>
  )
}

export default Auth
