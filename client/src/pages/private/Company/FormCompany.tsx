import type { SnackbarCloseReason } from "@mui/material"
import { Divider, Paper, Typography } from "@mui/material"
import type {
  IFullCompany,
  IFormCompany,
  CompanyUpdateBodyTypes,
} from "../../../types/company"
import type { SubmitHandler } from "react-hook-form"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {companySchema} from "../../../schema/companyShema"

import EmployeeTable from "./EmployeeTable/EmployeeTable"
import { useUpdateCompanyMutation } from "../../../app/api/companyApiSlice"
import { memo, useCallback, useEffect, useState } from "react"
import CompanyFileds from "./CompanyFileds"
import CompanyFormActions from "./CompanyFormActions"
import TableUpdateAlert from "./TableUpdateAlert "
import submitCompanyForm from "./submitCompanyForm"

export type UpdatedFileds = Partial<
  Pick<CompanyUpdateBodyTypes, "companyFileds" | "employeeFields">
>

// Main component to handle the company form, including adding, updating, and deleting employees
const FormCompany = ({ companyData }: { companyData: IFullCompany }) => {
  const { company, employees } = companyData

  // Hook for handling company update operations with a loading state and result information
  const [updateCompany, { isLoading, error, data, isSuccess, isError }] =
    useUpdateCompanyMutation()



  // State to manage the Snackbar visibility for update alerts
  const [open, setOpen] = useState(false)

    //  state for all deleted employee IDs 
  const [removedIds, setRemovedIds] = useState<string[]>([])

  // Handler to close the Snackbar, which can be triggered by user interaction or timeout
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  // Initialize form methods using `useForm` with default values and validation schema
  const methods = useForm<IFormCompany>({
    mode: "all", // Validation mode for checking on every change
    resolver: yupResolver(companySchema), // Use Yup resolver for schema validation
    defaultValues: {
      employeeLimit: company.employeeLimit, // Set default company employee limit
      name: company.name, // Set default company name
      employees
        
    },
  })

  const {
    handleSubmit, // Handler for form submission
    reset, // Function to reset the form to default values
    getValues, // Function to get current form values
    formState: { dirtyFields }, // Tracks which fields have been modified
  } = methods

  // Function to handle form submission
  const onSubmit: SubmitHandler<IFormCompany> = async form => {
    const body = submitCompanyForm({ dirtyFields, employees, form, getValues, removedIds })
    if (body) {
      updateCompany({
        body,
        companyId: company.id,
      }).finally(() => setRemovedIds([]))
    }
  }

  // Function to reset the form when a successful update occurs
  const resetForm = useCallback(() => {
    if (isSuccess) {
      reset({
        employeeLimit: company.employeeLimit,
        name: company.name,
        employees,
      })
      setOpen(true) // Open the Snackbar to show success message
    }

    if (isError) {
      setOpen(true) // Open the Snackbar to show error message
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company, employees, isError])

  // Run `resetForm` whenever `isSuccess` or `isError` changes
  useEffect(() => {
    resetForm()
  }, [resetForm])

  return (
    <FormProvider {...methods}>
      <Paper
        sx={{ padding: "1rem" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form-company"
      >
        {/* Snackbar alert for showing update status */}
        <TableUpdateAlert
          data={data}
          error={error}
          handleClose={(event, reason) => handleClose(event, reason)}
          isError={isError}
          isSuccess={isSuccess}
          open={open}
        />

        {/* Company Fields */}
        <CompanyFileds />

        {/* Divider and title for employee section */}
        <Divider>
          <Typography variant="h5" component={"h5"} sx={{ my: "1rem" }}>
            Employees
          </Typography>
        </Divider>

        {/* Employee Table */}
        <EmployeeTable isLoading={isLoading} removeEmployee={setRemovedIds} />

        {/* Divider and action buttons for form submission */}
        <Divider />
        <CompanyFormActions isLoading={isLoading} />
      </Paper>
    </FormProvider>
  )
}

export default memo(FormCompany)
