import React, { createContext, useState, useEffect }  from 'react'

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.querySelector('body').classList.add('dark')
      setTheme('dark')
    } else {
      document.querySelector('body').classList.remove('dark')
      setTheme('light')
    }
  }, [])

  function toggleThemeMode() {
    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'light'
    ) {
      localStorage.theme = 'dark'
      document.querySelector('body').classList.remove('light')
      document.querySelector('body').classList.add('dark')
      setTheme('dark')
    } else {
      localStorage.theme = 'light'
      document.querySelector('body').classList.remove('dark')
      document.querySelector('body').classList.add('light')
      setTheme('light')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
