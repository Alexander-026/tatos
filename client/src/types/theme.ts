import type { Theme } from "@mui/material"
import { createTheme } from "@mui/material"

export enum IThemeMode {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export interface IThemeContext {
  themeMode: IThemeMode
  swithThemeMode: (mode: IThemeMode ) => void
}

export const AppLightTheme: Theme = createTheme({
  palette: {
    background: {
      default: "#f4f1e6",
      paper: "#ffffff",
    },
  },
})

export const AppDarkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#263238",
      paper: "hsl(210, 25%, 9%)",
    },
  },
})
