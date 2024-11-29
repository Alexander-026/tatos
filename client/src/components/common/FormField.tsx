import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateField } from "@mui/x-date-pickers/DateField"
import dayjs from "dayjs"
import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { EmployeeLimit } from "../../types/company"
import PasswordHelperText from "./PasswordHelperText"

type InputType = "text" | "select" | "date"

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  errors: FieldErrors<T>
  name: keyof T
  label: string
  type?: InputType
  password?: boolean
  options?: { value: string | number; label: string }[]
  date?: boolean
  readonly?: boolean
  validate?: boolean
}

const FormField = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  type = "text",
  password,
  options,
  readonly,
  validate,
}: FormFieldProps<T>) => {
  const [visibility, setVisibility] = useState<boolean>(false)
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor={name as string}>{label}</InputLabel>
          {
            {
              text: (
                <Input
                  {...field}
                  id={name as string}
                  aria-describedby={`${name as string}-helper-text`}
                  size="small"
                  readOnly={readonly}
                  error={!!errors[name as string]}
                  type={password ? (visibility ? "text" : "password") : "text"}
                  endAdornment={
                    password && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setVisibility(pre => !pre)}
                        >
                          {visibility ? <MdVisibilityOff /> : <MdVisibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                />
              ),
              select: (
                <Select
                  {...field}
                  id={name as string}
                  inputProps={{"data-testid": label}}
                  aria-describedby={`${name as string}-helper-text`}
                  size="small"
                  error={!!errors[name as string]}
                  fullWidth
                  readOnly={readonly}
                  value={field.value || EmployeeLimit.level1}
                >
                  {options?.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ),
              date: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    {...field}
                    // label="Birth day"
                    format="DD.MM.YYYY"
                    value={dayjs(field.value) || null}
                    disableFuture
                    size="small"
                    variant="standard"
                    onChange={date =>
                      console.log("date", dayjs(date).format("DD.MM.YYYY"))
                    }
                    clearable
                    fullWidth
                  />
                </LocalizationProvider>
              ),
            }[type]
          }
          {name === "password" && field.value && validate ? (
            <PasswordHelperText password={field.value} />
          ) : (
            <FormHelperText error id={`${name as string}-helper-text`} data-testid={`${name as string}-helper-text`}>
              {errors[name]?.message as string}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default FormField
