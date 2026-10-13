import { useEffect, useRef, useState } from "react"
import Icon from "../shared/Icon"
import {
  initializeGoogleTranslate,
  switchGoogleLanguage,
} from "./googleTranslate"

const languages = [
  { code: "en", english: "English", native: "English" },
  { code: "hi", english: "Hindi", native: "हिन्दी" },
  { code: "bn", english: "Bengali", native: "বাংলা" },
  { code: "ta", english: "Tamil", native: "தமிழ்" },
  { code: "te", english: "Telugu", native: "తెలుగు" },
  { code: "mr", english: "Marathi", native: "मराठी" },
  { code: "gu", english: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", english: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", english: "Malayalam", native: "മലയാളം" },
  { code: "pa", english: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ur", english: "Urdu", native: "اردو" },
  { code: "as", english: "Assamese", native: "অসমীয়া" },
  { code: "or", english: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "ne", english: "Nepali", native: "नेपाली" },
  { code: "es", english: "Spanish", native: "Español" },
  { code: "fr", english: "French", native: "Français" },
  { code: "de", english: "German", native: "Deutsch" },
  { code: "it", english: "Italian", native: "Italiano" },
  { code: "pt", english: "Portuguese", native: "Português" },
  { code: "ar", english: "Arabic", native: "العربية" },
  { code: "zh-CN", english: "Chinese", native: "中文" },
  { code: "ja", english: "Japanese", native: "日本語" },
  { code: "ko", english: "Korean", native: "한국어" },
  { code: "id", english: "Indonesian", native: "Bahasa Indonesia" },
  { code: "th", english: "Thai", native: "ไทย" },
  { code: "vi", english: "Vietnamese", native: "Tiếng Việt" },
  { code: "ru", english: "Russian", native: "Русский" },
  { code: "tr", english: "Turkish", native: "Türkçe" },
  { code: "nl", english: "Dutch", native: "Nederlands" },
  { code: "pl", english: "Polish", native: "Polski" },
]

function getCurrentLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([^;]+)/)
  return languages.some((item) => item.code === match?.[1]) ? match![1] : "en"
}

export default function LanguageSelector({ onOpen }: { onOpen?: () => void }) {
  const [language, setLanguage] = useState("en")
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [supported, setSupported] = useState<string[]>([])
  const selectorRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const comboRef = useRef<HTMLSelectElement | null>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState("")
  const translationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    setLanguage(getCurrentLanguage())
    let disposed = false
    let combo: HTMLSelectElement | undefined
    const syncLanguage = () => {
      if (!combo) return
      const code = combo.value || "en"
      if (languages.some((item) => item.code === code)) setLanguage(code)
    }
    initializeGoogleTranslate(
      hostRef.current!,
      languages.map((item) => item.code).join(","),
    )
      .then((select) => {
        if (disposed) return
        combo = select
        comboRef.current = select
        setSupported(Array.from(select.options).map((option) => option.value))
        setStatus("ready")
        syncLanguage()
        select.addEventListener("change", syncLanguage)
      })
      .catch(() => {
        if (!disposed) {
          setStatus("error")
          setError(
            "In-page translation is unavailable or blocked. Your page and URL have not changed. A licensed translation service may be required for this deployment.",
          )
        }
      })
    return () => {
      disposed = true
      combo?.removeEventListener("change", syncLanguage)
    }
  }, [])

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", closeMenu)
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeMenu)
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  useEffect(() => {
    const originalRestored = new MutationObserver(() => {
      const root = document.documentElement
      if (
        !root.classList.contains("translated-ltr") &&
        !root.classList.contains("translated-rtl")
      ) {
        setLanguage("en")
        setError("")
        clearTimeout(translationTimer.current)
      }
    })
    originalRestored.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => {
      originalRestored.disconnect()
      clearTimeout(translationTimer.current)
    }
  }, [])

  const changeLanguage = (code: string) => {
    if (code === language && (!error || code === "en")) {
      setOpen(false)
      triggerRef.current?.focus()
      return
    }
    const combo = comboRef.current
    if (!combo || status !== "ready") {
      setError(
        status === "loading"
          ? "Google Translate is still loading. Please wait."
          : "In-page translation is unavailable. No navigation or reload has occurred.",
      )
      return
    }
    try {
      clearTimeout(translationTimer.current)
      const content = () =>
        document
          .getElementById("main-content")
          ?.textContent?.replace(/[0-9\s]/g, "") || ""
      const before = content()
      switchGoogleLanguage(combo, code)
      setLanguage(code)
      setError("")
      setOpen(false)
      triggerRef.current?.focus()
      if (code !== "en" && before) {
        // Google's cross-origin request errors are not exposed to React. Report
        // unchanged content without pretending the requested translation succeeded.
        translationTimer.current = setTimeout(() => {
          if (content() === before) {
            setError(
              "Google has not returned translated content yet. The service may be blocked or unsupported for this deployment. Your page and URL are unchanged; you can return to English.",
            )
          }
        }, 15000)
      }
    } catch (failure) {
      setLanguage(language)
      setError(
        failure instanceof Error
          ? failure.message
          : "Google could not switch the language. Please try again.",
      )
    }
  }

  return (
    <div
      className="language-selector language-wrap notranslate"
      ref={selectorRef}
      translate="no"
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        className="language-selector__trigger language-button"
        type="button"
        aria-label="Change website language"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="language-panel"
        onClick={() => {
          if (!open) onOpen?.()
          setOpen(!open)
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            onOpen?.()
            setOpen(true)
            requestAnimationFrame(() => {
              const items =
                selectorRef.current?.querySelectorAll<HTMLButtonElement>(
                  "[role=menuitemradio]:not(:disabled)",
                )
              const index =
                event.key === "ArrowUp" ? (items?.length || 1) - 1 : 0
              items?.[index]?.focus()
            })
          }
        }}
      >
        <Icon name="globe" />
        <span>{language === "zh-CN" ? "ZH" : language.toUpperCase()}</span>
        <Icon name="chevron" />
      </button>
      <div
        className={`language-selector__menu language-dropdown ${
          open ? "language-selector__menu--open" : ""
        }`}
        id="language-panel"
        hidden={!open}
      >
        <h3 className="language-selector__heading">Select language</h3>
        <p className="language-note">
          Translation by Google, directly on this page. Service availability may
          vary.
        </p>
        <p className="language-note" role="status" aria-live="polite">
          {error ||
            (status === "loading"
              ? "Loading Google Translate…"
              : "Select a language below. Your current page stays open.")}
        </p>
        <div
          className="language-selector__list"
          role="menu"
          aria-label="Website languages"
          onKeyDown={(event) => {
            const keys = ["ArrowDown", "ArrowUp", "Home", "End"]
            if (!keys.includes(event.key)) return
            event.preventDefault()
            const items = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "[role=menuitemradio]:not(:disabled)",
              ),
            )
            const index = items.indexOf(
              document.activeElement as HTMLButtonElement,
            )
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? items.length - 1
                  : (index +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      items.length) %
                    items.length
            items[next]?.focus()
          }}
        >
          {languages.map(({ code, english, native }) => (
            <button
              className={language === code ? "active" : ""}
              type="button"
              role="menuitemradio"
              aria-checked={language === code}
              tabIndex={language === code ? 0 : -1}
              disabled={
                code !== "en" &&
                (status === "loading" ||
                  (status === "ready" && !supported.includes(code)))
              }
              onClick={() => changeLanguage(code)}
              key={code}
            >
              <span>{english}</span>
              <small lang={code} dir="auto">
                ({native})
              </small>
              <span className="language-check">
                {language === code && <Icon name="check" />}
              </span>
            </button>
          ))}
        </div>
        <div
          ref={hostRef}
          id="google_translate_element"
          className="translator-host"
        />
        <a
          className="translation-policy"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy <Icon name="northeast" />
        </a>
      </div>
    </div>
  )
}
