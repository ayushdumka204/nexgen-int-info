import { AnimatePresence, m as motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import useMotionPreference from "../shared/useMotionPreference"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduced = useMotionPreference()
  const dark = theme === "dark"
  return (
    <button
      className="theme-toggle notranslate"
      type="button"
      translate="no"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? false : { opacity: 0, rotate: -40 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={reduced ? undefined : { opacity: 0, rotate: 40 }}
          transition={{ duration: reduced ? 0 : 0.15 }}
        >
          {dark ? (
            <Sun size={18} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Moon size={18} strokeWidth={1.5} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
