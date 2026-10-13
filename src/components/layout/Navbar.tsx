import { useEffect, useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Icon from "../shared/Icon"
import LanguageSelector from "./LanguageSelector"
import MegaMenu from "./MegaMenu"
import { navigation, type Navigate } from "../../data/home"
import ThemeToggle from "../theme/ThemeToggle"
export default function Navbar({
  openProposal,
  navigate,
}: {
  openProposal: () => void
  navigate: Navigate
}) {
  const [menu, setMenu] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const header = useRef<HTMLElement>(null)
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null)
        setMobile(false)
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      const target = event.target as Element
      if (!target.closest(".mega-menu, .nav-item")) setMenu(null)
      if (!header.current?.contains(target)) setMobile(false)
    }
    const focusOutside = (event: FocusEvent) => {
      const target = event.target as Element
      if (!target.closest(".mega-menu, .nav-item")) setMenu(null)
    }
    document.addEventListener("pointerdown", outside)
    document.addEventListener("focusin", focusOutside)
    return () => {
      document.removeEventListener("pointerdown", outside)
      document.removeEventListener("focusin", focusOutside)
    }
  }, [])
  return (
    <header className="header" ref={header}>
      <a href="#" className="brand" aria-label="NexGen home">
        <img src="/assets/nexgen-logo-clean.png" alt="NexGen" />
      </a>
      <nav
        className={mobile ? "nav mobile-open" : "nav"}
        aria-label="Main navigation"
      >
        {Object.keys(navigation).map((item) => (
          <button
            className={menu === item ? "nav-item active" : "nav-item"}
            key={item}
            aria-expanded={menu === item}
            aria-controls={menu === item ? "navigation-submenu" : undefined}
            onClick={() => {
              setMenu(menu === item ? null : item)
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault()
                setMenu(item)
                requestAnimationFrame(() =>
                  document
                    .querySelector<HTMLButtonElement>(
                      ".mega-menu:not([inert]) .mega-links button",
                    )
                    ?.focus(),
                )
              }
            }}
          >
            {item}
            <Icon name="chevron" />
          </button>
        ))}
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        <LanguageSelector
          onOpen={() => {
            setMenu(null)
            setMobile(false)
          }}
        />
        <button
          className="button button-small"
          onClick={() => {
            setMenu(null)
            setMobile(false)
            openProposal()
          }}
        >
          Request a Proposal
          <Icon name="northeast" />
        </button>
        <button
          className="mobile-toggle"
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          onClick={() => {
            setMobile(!mobile)
            setMenu(null)
          }}
        >
          <Icon name={mobile ? "close" : "menu"} />
        </button>
      </div>
      <AnimatePresence>
        {menu && (
          <MegaMenu
            key={menu}
            menu={menu}
            onNavigate={(label, category) => {
              setMenu(null)
              setMobile(false)
              navigate(label, category)
            }}
            onEscape={() => {
              header.current
                ?.querySelector<HTMLButtonElement>(".nav-item.active")
                ?.focus()
              setMenu(null)
            }}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
