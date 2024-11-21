import { Button, Menu, MenuItem } from "@mui/material"
import { useContext, useRef, useState } from "react"
import { IoIosColorPalette } from "react-icons/io"
import { ThemeContext } from "../context/ThemeContext"
import type { IThemeContext } from "../types/theme"
import { IThemeMode } from "../types/theme"

const ThemeSwitcher = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const { themeMode, swithThemeMode } = useContext(
    ThemeContext,
  ) as IThemeContext

  const hanldeOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSwichTheme = (mode: IThemeMode) => {
    swithThemeMode(mode)
    handleClose()
  }
  return (
    <>
      <Button
        onClick={hanldeOpen}
        ref={buttonRef}
        startIcon={<IoIosColorPalette />}
      >
        Theme
      </Button>
      <Menu  open={open} anchorEl={buttonRef.current} onClose={handleClose}>
        <MenuItem  onClick={() => handleSwichTheme(IThemeMode.LIGHT)} selected={themeMode === IThemeMode.LIGHT}>
          Light
        </MenuItem>
        <MenuItem   onClick={() => handleSwichTheme(IThemeMode.DARK)} selected={themeMode === IThemeMode.DARK}>
          Dark
        </MenuItem>
        <MenuItem   onClick={() => handleSwichTheme(IThemeMode.SYSTEM)} selected={themeMode === IThemeMode.SYSTEM}>
          System
        </MenuItem>
      </Menu>
    </>
  )
}

export default ThemeSwitcher
