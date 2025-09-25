'use client'

import React, { createContext, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

const DARK_THEME: Theme = 'dark'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: DARK_THEME,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(DARK_THEME)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', DARK_THEME)
    localStorage.setItem('theme', DARK_THEME) // Optional: persist dark mode
    setThemeState(DARK_THEME)
  }, [])

  // setTheme becomes a no-op to prevent changes
  const setTheme = () => {}

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
