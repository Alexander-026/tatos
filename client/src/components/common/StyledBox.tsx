import { styled, Box } from "@mui/material"

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
})) as typeof Box

export default StyledBox
