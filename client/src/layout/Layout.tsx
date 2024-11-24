import {  Stack } from "@mui/material"
import Main from "./Main"
import Sidebar from "./Sidebar/Sidebar"

const Layout = () => {
  return (
    <Stack
      flexDirection="row"
      sx={[
        theme => ({
          minHeight: "100vh",
          backgroundColor: theme.palette.background.paper,
        }),
      ]}
    >
      <Sidebar/>
      <Main />
    </Stack>
  )
}

export default Layout
