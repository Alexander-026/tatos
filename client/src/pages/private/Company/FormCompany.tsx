import { Divider, Paper, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import type {
  IFullCompany,
  ICompany,
  IFormCompany,
} from "../../../types/company"
import { EmployeeLimit } from "../../../types/company"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import companySchema from "../../../schema/companyShema"
import FormField from "../../../components/common/FormField"
import { useAppSelector } from "../../../app/hooks"

import EmployeeTable from "./EmployeeTable"

const FormCompany = ({ companyData }: { companyData: IFullCompany }) => {
  const { company, employees } = companyData
  const { user } = useAppSelector(state => state.user)
  const methods = useForm<IFormCompany>({
    mode: "all",
    resolver: yupResolver(companySchema),
    defaultValues: {
      employeeLimit: company.employeeLimit,
      name: company.name,
      employees: employees.map(emp => ({
        birthDate: emp.birthDate,
        email: emp.email,
        emailStatus: emp.emailStatus,
        firstName: emp.firstName,
        image: emp.image,
        lastName: emp.lastName,
        role: emp.role
      })),
    },
  })
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = methods

  if (user && user.role === "Employee") return <></>

  return (
    <>
      <Paper sx={{ padding: "1rem" }} component="form">
        <Grid width={"100%"} container spacing={4}>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormField<IFormCompany>
              control={control}
              errors={errors}
              name="name"
              label="Company Name"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <FormField<IFormCompany>
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
          </Grid>
        </Grid>
      </Paper>
      <Divider>
         <Typography variant="h5" component={"h5"} sx={{my: "1rem"}}>Employees</Typography>
      </Divider>
      <FormProvider {...methods}>
        <EmployeeTable />
      </FormProvider>
    </>
  )
}

export default FormCompany
