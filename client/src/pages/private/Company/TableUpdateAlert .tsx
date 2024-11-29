import type { SnackbarCloseReason } from "@mui/material"
import { Alert, Snackbar } from "@mui/material"
import type { UpdatedCompany } from "../../../types/company"
import type ApiError from "../../../types/errors"
import type { SyntheticEvent } from "react"
import Notification from "../../../components/common/Notification"

// Type definition for props used in TableUpdateAlert component
type TableUpdateAlertTypes = {
  open: boolean // Indicates if the snackbar should be open or closed
  isSuccess: boolean // Determines if the alert should show a success message
  isError: boolean // Determines if the alert should show an error message
  data: UpdatedCompany | undefined // Contains the updated company data if the update was successful
  error: ApiError // Contains error information if the update failed
  handleClose: (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => void // Function to handle the close event for the snackbar
}

// Component for displaying an alert after a table update action
const TableUpdateAlert = ({
  data,
  error,
  handleClose,
  isError,
  isSuccess,
  open,
}: TableUpdateAlertTypes) => {
  return (
    <>
      <Notification />
      <Snackbar
        open={open} // Controls whether the Snackbar is visible
        autoHideDuration={4000} // Automatically hides the Snackbar after 4000 milliseconds
        onClose={handleClose} // Event handler for closing the Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ maxWidth: "20rem" }}
      >
        <Alert
          onClose={handleClose} // Event handler for closing the Alert component
          severity={isSuccess ? "success" : isError ? "error" : "success"} // Sets the alert severity based on `isSuccess` and `isError` values
          variant="filled" // Sets the variant to "filled" for a more prominent appearance
          sx={{ width: "100%", color: "#FFFFFF" }} // Styling for the Alert
        >
          {/* Display the success message if update was successful */}
          {data && data.message}

          {/* Display the error message if there was an error */}
          {error && (error as ApiError).data.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default TableUpdateAlert
