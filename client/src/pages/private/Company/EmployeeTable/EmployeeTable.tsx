import { useFieldArray, useFormContext } from "react-hook-form"
import type { IFormCompany, IFormEmployee } from "../../../../types/company"
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
} from "@mui/material"
import Grid from "@mui/material/Grid2"

import { EmailStatus, UserRole } from "../../../../types/user"
import { IoIosPersonAdd } from "react-icons/io"
import { useRef } from "react"
import EmployeeRow from "./EmployeeRow"

// Function to create a new employee with default values
const addNewEmployee = (index: number): IFormEmployee => {
  return {
    email: `employye${index || 1}@gmail.com`,
    firstName: `firsName-${index || 1}`,
    lastName: `lastName-${index || 1}`,
    birthDate: "",
    role: UserRole.employee,
    password: "123",
    emailStatus: EmailStatus.unconfirmed,
    image: "none",
    id: "new",
  }
}

const EmployeeTable = ({ isLoading }: { isLoading: boolean }) => {
  // Get form context using useFormContext to work with the form state
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormCompany>()

  // Using useFieldArray to manage the array of employees within the form
  const { fields, append, remove } = useFieldArray({
    name: "employees", // Name of the array to be managed in the form state
    control,
    keyName: "_id", // Specify key for React to uniquely identify elements in the array
    rules: {
      maxLength: 20, // Maximum number of employees allowed
    },
  })

  // Reference to the table container for scrolling purposes
  const tableContainerRef = useRef<HTMLDivElement | null>(null)

  // Function to append a new employee to the employee list and scroll to it
  const handleAppend = () => {
    append(addNewEmployee(fields.length + 1)) // Append a new employee to the array

    // Scroll to the bottom of the table after adding a new employee
    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTo({
          top: tableContainerRef.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }, 0)
  }

  return (
    <Grid width={"100%"} container spacing={1}>
      {/* Button to add a new employee */}
      <Grid size={12}>
        <Button
          variant="contained"
          disabled={isLoading} // Disable the button while loading
          startIcon={<IoIosPersonAdd />} // Icon before the button label
          onClick={handleAppend} // Call handleAppend when clicked
          size="small"
        >
          Add Employee
        </Button>
      </Grid>

      {/* Table displaying the list of employees */}
      <Grid size={12}>
        <TableContainer
          ref={tableContainerRef}
          component={Paper}
          sx={{
            maxHeight: "26rem", // Limit the maximum height of the table container
          }}
        >
          <Table
            size="small"
            stickyHeader
            aria-label="employee table"
            sx={{ minWidth: "1100px" }} // Minimum width for the table to avoid layout issues
           
          >
            <TableHead
              sx={[theme => ({ bgcolor: theme.palette.background.default })]}
            >
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Email Status</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Render each employee row */}
              {fields.map((employee, i) => (
                <EmployeeRow
                  key={employee._id} // Unique key for each employee row
                  employee={employee} // Employee data for the current row
                  index={i} // Index of the current employee
                  control={control} // Control object from react-hook-form
                  errors={errors} // Form errors to display validation messages
                  remove={remove} // Remove function to delete the employee
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default EmployeeTable
