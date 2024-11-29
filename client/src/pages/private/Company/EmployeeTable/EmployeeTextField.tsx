import { MenuItem, TextField } from "@mui/material"
import { type ComponentProps } from "react"
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form"
import type { IFormEmployee } from "../../../../types/company"

// Props interface for the EmployeeTextField component
interface EmployeeTextFieldProps<T extends FieldValues>
  extends ComponentProps<typeof TextField> {
  name: Path<T> // The name of the field as defined in the form structure
  pathName: Path<IFormEmployee> // The name of the field as defined in the form structure
  control: Control<T> // Control object provided by react-hook-form for managing the form state
  label?: string // Optional label for the input field
  selectOptions?: string[] // Optional array of select options (if the field is a dropdown)
  errors?: FieldErrors<T> // Optional errors object, containing validation errors for the form fields
}

// EmployeeTextField is a reusable text field component that uses react-hook-form for form management
const EmployeeTextField = <T extends FieldValues>({
  name,
  control,
  label,
  selectOptions,
  pathName,
  errors,
  ...props
}: EmployeeTextFieldProps<T>) => (
  <Controller
    name={name} // Field name to identify the value in form state
    control={control} // Control object to manage form state
    render={({ field }) => (
      <TextField
        {...field} // Spread field props provided by react-hook-form (e.g., onChange, value, ref)
        {...props}
        label={label}
        variant="standard"
        size="small"
        select={!!selectOptions} // If selectOptions are provided, make the field a dropdown (select)
        error={errors ? !!errors[pathName] : false} // Display error styling if there is an error for this field
        helperText={errors ? (errors[pathName]?.message as string) : ""} // Show error message if one exists
      >
        {selectOptions &&
          selectOptions.map(option => (
            // Render each option if selectOptions are provided
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    )}
  />
)

export default EmployeeTextField
