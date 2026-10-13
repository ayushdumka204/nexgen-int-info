import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark"
const storageKey = "nexgen-theme"
const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
} | null>(null)

function storedPreference(): Theme | null {
  try {
    const value = localStorage.getItem(storageKey)
    return value === "light" || value === "dark" ? value : null
  } catch {
    return null
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<Theme | null>(storedPreference)
  const [systemTheme, setSystemTheme] = useState<Theme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  )
  const theme = preference ?? systemTheme

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    root.dataset.themeReady = "true"
  }, [theme])

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const systemChanged = () => setSystemTheme(query.matches ? "dark" : "light")
    const preferenceChanged = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null)
        setPreference(storedPreference())
    }
    query.addEventListener("change", systemChanged)
    window.addEventListener("storage", preferenceChanged)
    return () => {
      query.removeEventListener("change", systemChanged)
      window.removeEventListener("storage", preferenceChanged)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light"
    setPreference(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      /* Theme still works when storage is restricted. */
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used inside ThemeProvider")
  return context
}
