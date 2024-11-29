import {
  Controller,
  type Control,
  type FieldErrors,
  type Path,
} from "react-hook-form"
import type { IFormCompany, IFormEmployee } from "../../../../types/company"
import type React from "react"
import { IconButton, Stack, TableCell, TableRow } from "@mui/material"
// import MyAvatar from "../../../../components/MyAvatar"
import EmployeeTextField from "./EmployeeTextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateField } from "@mui/x-date-pickers/DateField"
import dayjs from "dayjs"
import { EmailStatus, UserRole } from "../../../../types/user"
import { IoIosRemoveCircle } from "react-icons/io"

// Define the props for the EmployeeRow component
interface EmployeeRowProps {
  employee: IFormEmployee // Single employee data
  index: number // Index of the employee in the employees array
  control: Control<IFormCompany> // Control object from react-hook-form for managing form state
  errors: FieldErrors<IFormCompany> // Errors object from react-hook-form to manage validation errors
  remove: (index: number) => void // Function to remove an employee by index
}

// EmployeeRow component represents a single row in the employees table
const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  index,
  control,
  errors,
  remove,
}) => (
  <TableRow
    hover
    selected={employee.id === "new"} // Highlight newly added employee rows
    key={employee.id}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Remove border from the last cell of the row
  >
    {/* Full Name Field */}
    <TableCell>
      <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"flex-end"}
        sx={{ width: "100%" }}
      >
        {/* Employee Avatar */}
        {/* <MyAvatar
          small
          user={{
            email: employee.email,
            firstName: employee.firstName,
            lastName: employee.lastName,
            image: employee.email,
          }}
        /> */}
        {/* First Name TextField */}
        <EmployeeTextField<IFormCompany>
          name={`employees.${index}.firstName` as Path<IFormCompany>}
          pathName="firstName"
          control={control}
          errors={errors.employees?.[index]}
          sx={{ width: "50%" }}
        />
        {/* Last Name TextField */}
        <EmployeeTextField<IFormCompany>
          name={`employees.${index}.lastName` as Path<IFormCompany>}
          control={control}
          pathName="lastName"
          errors={errors.employees?.[index]}
          sx={{ width: "50%" }}
        />
      </Stack>
    </TableCell>

    {/* Birth Date Field */}
    <TableCell sx={{ width: "9rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={`employees.${index}.birthDate`} // Binding birthDate field with form control
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={field.value ? dayjs(field.value) : null} // Convert value to Day.js instance if it exists
              format="DD.MM.YYYY"
              disableFuture // Prevent selecting future dates
              variant="standard"
              size="small"
              onChange={
                date => field.onChange(dayjs(date).format("YYYY-MM-DD")) // Format and update the value when changed
              }
            />
          )}
        />
      </LocalizationProvider>
    </TableCell>

    {/* Email Field */}
    <TableCell>
      <EmployeeTextField<IFormCompany>
        name={`employees.${index}.email` as Path<IFormCompany>}
        control={control}
        pathName="email"
        errors={errors.employees?.[index]}
      />
    </TableCell>

    {/* Email Status Field */}
    <TableCell sx={{ width: "10rem" }}>
      <EmployeeTextField<IFormCompany>
        name={`employees.${index}.emailStatus` as Path<IFormCompany>}
        control={control}
        pathName="emailStatus"
        errors={errors.employees?.[index]}
        selectOptions={Object.values(EmailStatus)} // Provide select options for email status
      />
    </TableCell>

    {/* Role Field and Delete Button */}
    <TableCell sx={{ width: "10rem" }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={1}
        justifyContent={"space-between"}
      >
        {/* Role TextField */}
        <EmployeeTextField<IFormCompany>
          name={`employees.${index}.role` as Path<IFormCompany>}
          control={control}
          pathName="role"
          errors={errors.employees?.[index]}
          selectOptions={Object.values(UserRole)} // Provide select options for role
        />
        {/* Delete Employee Button */}
        <IconButton
          color="error"
          onClick={() => remove(index)}
          aria-label="remove"
        >
          <IoIosRemoveCircle />
        </IconButton>
      </Stack>
    </TableCell>
  </TableRow>
)

export default EmployeeRow
