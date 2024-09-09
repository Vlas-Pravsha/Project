export function useTheme() {
  const THEME_KEY = 'app-theme'
  const DARK_THEME = 'dark'
  const LIGHT_THEME = 'light'

  const getTheme = () => {
    return localStorage.getItem(THEME_KEY) || LIGHT_THEME
  }

  const applyTheme = (theme: any) => {
    if (theme === DARK_THEME) {
      document.body.classList.add('dark')
    }
    else {
      document.body.classList.remove('dark')
    }
  }

  const setTheme = (theme: any) => {
    localStorage.setItem(THEME_KEY, theme)
    applyTheme(theme)
  }

  const toggleTheme = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    setTheme(newTheme)
  }

  const initTheme = () => {
    const savedTheme = getTheme()
    applyTheme(savedTheme)
  }

  return {
    getTheme,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
