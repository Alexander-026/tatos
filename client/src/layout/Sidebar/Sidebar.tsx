import { Box, IconButton, Paper, Stack } from "@mui/material"
import { useState } from "react"
import { LuPanelLeftClose } from "react-icons/lu"
import { LuPanelLeftOpen } from "react-icons/lu"
import ThemeSwitcher from "../../components/ThemeSwitcher"
import MenuPages from "../../components/MenuPages"
import ProfileMenu from "../../components/ProfileMenu"

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Box>
      <Paper
        square
        sx={{
          width: open ? "15rem" : "6rem",
          padding: "1rem 0.5rem",
          transition: "width 0.2s ease-in-out",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <LuPanelLeftClose /> : <LuPanelLeftOpen />}
            </IconButton>
          </Box>
          <MenuPages openSidebar={open} />
          <Stack gap={2}>
            <ThemeSwitcher />
            <ProfileMenu open={open} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Sidebar
