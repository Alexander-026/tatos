import {
  Paper,
  Typography,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import type { IFullCompany } from "../../../types/company"
import { useRef } from "react"
import dayjs from "dayjs"

const ReadonlyCompanyData = ({
  employees,
}: {
  employees: IFullCompany["employees"]
}) => {
  // Reference to the table container for scrolling purposes
  const tableContainerRef = useRef<HTMLDivElement | null>(null)
  return (
    <Paper sx={{ padding: "1rem" }} data-testid="readonly">
      <Typography
        textAlign="center"
        variant="h5"
        component={"h5"}
        sx={{ my: "1rem" }}
      >
        Employees
      </Typography>
      <Grid width={"100%"} container spacing={1}>
        <Grid size={12}>
          <TableContainer
            sx={{
              maxHeight: "26rem", // Limit the maximum height of the table container
            }}
          >
            <Table
              size="small"
              stickyHeader
              aria-label="employee table"
              sx={{ minWidth: "1000px" }} // Minimum width for the table to avoid layout issues
            >
              <TableHead
                sx={[theme => ({ bgcolor: theme.palette.background.default })]}
              >
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {employees.map((employee) => (
                     <TableRow
                     hover
                     key={employee.id}
                    //  sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Remove border from the last cell of the row
                   >
                     <TableCell>
                        {employee.firstName}{" "}{employee.lastName}
                     </TableCell>
                     <TableCell sx={{ width: "9rem" }}>
                        {dayjs(employee.birthDate).format("DD.MM.YYYY")}
                     </TableCell>
                     <TableCell>
                        {employee.email}
                     </TableCell>
                     <TableCell sx={{ width: "10rem" }}>
                        {employee.role}
                     </TableCell>
                   </TableRow>
                 ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ReadonlyCompanyData
