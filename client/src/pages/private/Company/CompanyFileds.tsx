import { useFormContext } from "react-hook-form"
import Grid from "@mui/material/Grid2"
import { EmployeeLimit, type IFormCompany } from "../../../types/company"
import FormField from "../../../components/common/FormField"

// Component for rendering company-related fields using react-hook-form
const CompanyFileds = () => {
  // Get form context from react-hook-form for managing the form state
  const {
    control, // Control object to manage the form state and interaction
    formState: { errors }, // Form errors to handle validation messages
  } = useFormContext<IFormCompany>()

  return (
    <Grid width={"100%"} container spacing={4}>
      {/* Company Name Field */}
      <Grid size={{ md: 6, xs: 12 }}>
        <FormField<IFormCompany>
          control={control} 
          errors={errors} 
          name="name" 
          label="Company Name" 
        />
      </Grid>

      {/* Employee Limit Field */}
      <Grid size={{ md: 6, xs: 12 }}>
        <FormField<IFormCompany>
          control={control} 
          errors={errors} 
          name="employeeLimit" 
          label="Employee Limit"
          type="select" // This field is a dropdown (select type)
          options={Object.values(EmployeeLimit).map(value => ({
            value, // The actual value for each dropdown option
            label: value, // The label displayed for each option
          }))}
        />
      </Grid>
    </Grid>
  )
}

export default CompanyFileds
