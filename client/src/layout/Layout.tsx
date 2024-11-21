/* eslint-disable react-hooks/exhaustive-deps */
import type { SnackbarCloseReason } from "@mui/material"
import { Alert, Snackbar, Stack } from "@mui/material"
import Main from "./Main"
import Sidebar from "./Sidebar/Sidebar"
import { useNavigate, useParams } from "react-router-dom"
import { useLazyGetCompanyQuery } from "../app/api/companyApiSlice"
import { useCallback, useEffect, useState } from "react"
import type ApiError from "../types/errors"

const Layout = () => {
  const { id } = useParams()
  const [getCompany, {  isError, error, isLoading }] =
    useLazyGetCompanyQuery()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const getCompanyHanlder = useCallback(() => {
    if (id) {
      getCompany({ companyId: id }).then((data:any) => {
        if(data.status === "rejected") {
         
          setOpen(true)
        }
       
      })
    }
  }, [getCompany, id])


  useEffect(() => {
    getCompanyHanlder()
  }, [getCompanyHanlder])

 

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
    navigate(-1)
  }


  return (
    <Stack
      flexDirection="row"
      sx={[
        theme => ({
          minHeight: "100vh",
          backgroundColor: theme.palette.background.paper,
        }),
      ]}
    >
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error && (error as ApiError).data.message}
        </Alert>
      </Snackbar>
      <Sidebar />
      <Main />
    </Stack>
  )
}

export default Layout
