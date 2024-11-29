import type React from "react"
import { useCallback, useEffect, useState, type FC } from "react"
import type ApiError from "../../types/errors"
import type { SnackbarCloseReason } from "@mui/material"
import { Alert, Snackbar } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

type NotificationType = {
  dataMessage?: string | undefined
  isSuccess?: boolean | undefined
  isError?: boolean | undefined
  error?: ApiError | undefined
  onClose?: () => void
  position?: "left" | "center" | "right"
}

const Notification: FC<NotificationType> = ({
  dataMessage,
  error,
  isError,
  isSuccess,
  onClose,
  position = "center",
}) => {
    const location = useLocation()
  const navigate = useNavigate()
  const locationError = location.state as ApiError
 

  const handleNotification = () => {
    if (locationError) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }
  const [open, setOpen] = useState<boolean>(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
    if(locationError) {
        handleNotification()
    }
    onClose && onClose()
  }

  const handleOpen = useCallback(() => {
    if (isError || isSuccess || dataMessage || error || locationError) {
      console.log(" setOpen(true);")
      setOpen(true)
    }
  }, [error, dataMessage, isError, isSuccess, locationError])

  useEffect(() => {
    handleOpen()
  }, [handleOpen])
  return (
    <Snackbar
      open={open} // Controls whether the Snackbar is visible
      autoHideDuration={4000} // Automatically hides the Snackbar after 4000 milliseconds
      onClose={handleClose} // Event handler for closing the Snackbar
      anchorOrigin={{ horizontal: position, vertical: "top" }}
      sx={{ maxWidth: "20rem" }}
    >
      <Alert
        onClose={handleClose} // Event handler for closing the Alert component
        severity={isSuccess ? "success" :( isError || locationError) ? "error" : undefined} // Sets the alert severity based on `isSuccess` and `isError` values
        variant="filled" // Sets the variant to "filled" for a more prominent appearance
        sx={{ width: "100%", color: "#FFFFFF", display: (isSuccess || isError || locationError) ? "flex" : "none" }} // Styling for the Alert
      >
        {dataMessage && dataMessage}
        {error && (error as ApiError).data.message}
        {locationError && locationError.data.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
