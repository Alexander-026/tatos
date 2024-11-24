import { Outlet } from "react-router-dom"
import StyledBox from "../components/common/StyledBox"
import CompanyContextProvider from "../context/CompanyContext"

const Main = () => {
  return (
    <StyledBox
      component="main"
      sx={{
        flexGrow: 1,
        maxHeight: "100vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden", 
        display: "flex",
      }}
    >
      <CompanyContextProvider>
        <Outlet />
      </CompanyContextProvider>
    </StyledBox>
  )
}

export default Main
