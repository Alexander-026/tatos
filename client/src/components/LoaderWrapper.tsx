import type { SnackbarCloseReason } from "@mui/material"
import { Alert,  CircularProgress, Snackbar } from "@mui/material"
import { useEffect, useState, type ReactNode } from "react"
import type React from "react"
import StyledBox from "./common/StyledBox"
import type ApiError from "../types/errors"

type LoaderWrapperProps<T> = {
  loading: boolean
  data: T | undefined
  error: ApiError
  children: (data: T) => ReactNode
}

const LoaderWrapper = <T,>({
  data,
  loading,
  error,
  children,
}: LoaderWrapperProps<T>) => {
  const [open, setOpen] = useState(false)
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setOpen(true)
  }, [error])

  if (loading) {
    return (
      <StyledBox
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </StyledBox>
    )
  }

  if (error) {
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{horizontal: "center", vertical: "top"}}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error.data.message}
        </Alert>
      </Snackbar>
    )
  }

  if (data) {
    return <>{children(data)}</>
  }

  return null
}

export default LoaderWrapper
