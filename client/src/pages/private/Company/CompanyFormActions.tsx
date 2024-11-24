import { useFormContext } from "react-hook-form"
import type { IFormCompany } from "../../../types/company"
import { Button, CircularProgress, Stack } from "@mui/material"
import StyledBox from "../../../components/common/StyledBox"
import { BiReset } from "react-icons/bi";
import { FaSave } from "react-icons/fa";

const CompanyFormActions = ({isLoading}: {isLoading:boolean}) => {
  const {
    reset,
    formState: { isDirty, isValid },
  } = useFormContext<IFormCompany>()
  return (
    <Stack
      flexDirection={"row"}
      sx={{ p: "0.5rem", borderRadius: "0 0 4px 4px" }}
      justifyContent={"end"}
      component={StyledBox}
      gap={2}
    >
      <Button
        disabled={!isValid || !isDirty || isLoading}
        variant="contained"
        onClick={() => reset()}
        size="small"
        startIcon={<BiReset/>}
      >
       {isLoading ? (
          <CircularProgress size={22} color="primary" variant="indeterminate" />
        ) : (
          "Reset"
        )}
      </Button>
      <Button
        disabled={!isValid || !isDirty || isLoading}
        variant="contained"
        type="submit"
        size="small"
        endIcon={<FaSave/>}
      >
        {isLoading ? (
          <CircularProgress size={22} color="primary" variant="indeterminate" />
        ) : (
          "Save"
        )}
      </Button>
    </Stack>
  )
}

export default CompanyFormActions
