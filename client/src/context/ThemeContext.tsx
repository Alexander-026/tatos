import type React from "react"
import { createContext, useEffect, useState } from "react"
import type { IThemeContext } from "../types/theme"
import { AppDarkTheme, AppLightTheme, IThemeMode } from "../types/theme"
import { ThemeProvider, useMediaQuery, type Theme } from "@mui/material"

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
    
  const [themeMode, setThemeMode] = useState<IThemeMode>(() =>{
    const savedTheme = localStorage.getItem("themeMode") as IThemeMode | null;
    return savedTheme ? savedTheme : IThemeMode.LIGHT;
  })
  const [theme, setTheme] = useState<Theme>(AppLightTheme)

  const SYSTEM_THEME: Exclude<IThemeMode, IThemeMode.SYSTEM> = useMediaQuery(
    "(prefers-color-scheme: dark)",
  )
    ? IThemeMode.DARK
    : IThemeMode.LIGHT

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    switch (themeMode) {
      case IThemeMode.LIGHT:
        setTheme(AppLightTheme)
        break
      case IThemeMode.DARK:
        setTheme(AppDarkTheme)
        break
      case IThemeMode.SYSTEM:
        switch (SYSTEM_THEME) {
          case IThemeMode.LIGHT:
            setTheme(AppLightTheme)
            break
          case IThemeMode.DARK:
            setTheme(AppDarkTheme)
            break
        }
        break
      default:
        setTheme(AppLightTheme)
        break
    }
  }, [themeMode, SYSTEM_THEME])

  const swithThemeMode = (mode: IThemeMode) => {
    setThemeMode(mode)
  }

  return (
    <ThemeContext.Provider value={{ themeMode, swithThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
