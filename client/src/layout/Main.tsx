import { Outlet } from "react-router-dom"
import StyledBox from "../components/common/StyledBox"

const Main = () => {
  return (
    <StyledBox
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Outlet />
    </StyledBox>
  )
}

export default Main
