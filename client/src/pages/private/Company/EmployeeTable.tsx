import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import type { IFormCompany, IFormEmployee } from "../../../types/company"
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Stack,
} from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateField } from "@mui/x-date-pickers/DateField"
import MyAvatar from "../../../components/MyAvatar"
import dayjs from "dayjs"
import { UserRole } from "../../../types/user"
import { IoIosRemoveCircle } from "react-icons/io"

const newEmployee: IFormEmployee = {
  email: "employye@gmail.com",
  firstName: "",
  lastName: "",
  birthDate: "",
  role: UserRole.employee,
  emailStatus: "unconfirmed",
  image: "",
  id: "",
}

const EmployeeTable = () => {
  const {
    control,
    register,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useFormContext<IFormCompany>()
  const { fields, append, remove } = useFieldArray({
    name: "employees",
    control,
  })

  const watchEmployees = watch("employees")

  console.log("watchEmployees", watchEmployees)
  console.log("fields", fields)

  return (
    <TableContainer
    component={Paper}
  >
    <Table   aria-label="employee table">
      <TableHead>
        <TableRow>
          {/* <TableCell>Avatar</TableCell> */}
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Birth Date</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {fields.map((employee, i) => (
          <TableRow
            key={employee.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {/* <TableCell >
            <MyAvatar
              user={{
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName,
                image: employee.email,
              }}
            />
          </TableCell> */}
            <TableCell>
              <Controller
                name={`employees.${i}.firstName`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} variant="standard" size="small" />
                )}
              />
            </TableCell>
            <TableCell>
              <Controller
                name={`employees.${i}.lastName`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} variant="standard" size="small" />
                )}
              />
            </TableCell>
            <TableCell>
              <Controller
                name={`employees.${i}.birthDate`}
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      {...field}
                      name={`employees.${i}.birthDate`}
                      value={field.value ? dayjs(field.value) : null} // Проверяем и конвертируем дату
                      format="DD.MM.YYYY"
                      disableFuture
                      variant="standard"
                      size="small"
                      onChange={date => {
                        if (date) {
                          field.onChange(dayjs(date).format("YYYY-MM-DD"))
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </TableCell>
            <TableCell>
              <Controller
                name={`employees.${i}.email`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    error={
                      errors.employees
                        ? !!errors.employees[i]?.email
                        : false
                    }
                    size="small"
                    helperText={
                      errors.employees
                        ? errors.employees[i]?.email?.message
                        : ""
                    }
                  />
                )}
              />
            </TableCell>
            <TableCell>
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <Controller
                  name={`employees.${i}.role`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={
                        errors.employees
                          ? !!errors.employees[i]?.role
                          : false
                      }
                      variant="standard"
                      size="small"
                      helperText={
                        errors.employees
                          ? errors.employees[i]?.role?.message
                          : ""
                      }
                      select
                    >
                      <MenuItem value={UserRole.manager}>
                        {UserRole.manager}
                      </MenuItem>
                      <MenuItem value={UserRole.employee}>
                        {UserRole.employee}
                      </MenuItem>
                    </TextField>
                  )}
                />
                <IconButton color="error" onClick={() => remove(i)}>
                  <IoIosRemoveCircle />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button onClick={() => append(newEmployee)}>Append</Button>
  </TableContainer>
  )
}

export default EmployeeTable
