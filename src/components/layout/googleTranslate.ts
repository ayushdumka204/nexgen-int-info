type TranslateConstructor = new (
  options: {
    pageLanguage: string
    includedLanguages: string
    autoDisplay: boolean
  },
  elementId: string,
) => unknown

type TranslateWindow = Window & {
  googleTranslateElementInit?: () => void
  google?: { translate?: { TranslateElement: TranslateConstructor } }
}

let scriptReady: Promise<TranslateConstructor> | undefined
const widgets = new WeakMap<HTMLElement, Promise<HTMLSelectElement>>()

function loadScript() {
  if (scriptReady) return scriptReady
  scriptReady = new Promise<TranslateConstructor>((resolve, reject) => {
    const win = window as TranslateWindow
    const existing = win.google?.translate?.TranslateElement
    if (existing) {
      resolve(existing)
      return
    }
    const timer = setTimeout(
      () => reject(new Error("Google Translate did not load.")),
      15000,
    )
    const loaded = () => {
      const constructor = win.google?.translate?.TranslateElement
      if (constructor) {
        clearTimeout(timer)
        resolve(constructor)
      }
    }
    win.googleTranslateElementInit = loaded
    let script = document.querySelector<HTMLScriptElement>(
      "#google-translate-script",
    )
    if (!script) {
      script = document.createElement("script")
      script.id = "google-translate-script"
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      script.addEventListener(
        "error",
        () => {
          clearTimeout(timer)
          reject(new Error("Google Translate is blocked or unavailable."))
        },
        { once: true },
      )
      document.head.appendChild(script)
    }
    script.addEventListener("load", loaded, { once: true })
  })
  return scriptReady
}

export function initializeGoogleTranslate(
  host: HTMLElement,
  includedLanguages: string,
) {
  const existing = widgets.get(host)
  if (existing) return existing
  // The shared promise survives StrictMode effect cleanup; each host initializes once.
  const widget = loadScript().then(
    (Constructor) =>
      new Promise<HTMLSelectElement>((resolve, reject) => {
        let observer: MutationObserver
        const timer = setTimeout(() => {
          observer.disconnect()
          reject(
            new Error("Google Translate could not initialize on this website."),
          )
        }, 15000)
        const ready = () => {
          const combo = host.querySelector<HTMLSelectElement>(".goog-te-combo")
          if (combo && combo.options.length > 1) {
            clearTimeout(timer)
            observer.disconnect()
            resolve(combo)
          }
        }
        observer = new MutationObserver(ready)
        observer.observe(host, { childList: true, subtree: true })
        try {
          if (!host.querySelector(".goog-te-combo")) {
            new Constructor(
              { pageLanguage: "en", includedLanguages, autoDisplay: false },
              host.id,
            )
          }
          ready()
        } catch (error) {
          clearTimeout(timer)
          observer.disconnect()
          reject(error)
        }
      }),
  )
  widgets.set(host, widget)
  return widget
}

export function switchGoogleLanguage(combo: HTMLSelectElement, code: string) {
  const restoreOriginal = () => {
    for (const frame of document.querySelectorAll<HTMLIFrameElement>(
      "iframe",
    )) {
      try {
        const restore = frame.contentDocument?.querySelector<HTMLButtonElement>(
          'button[id$=".restore"]',
        )
        if (restore) {
          restore.click()
          return true
        }
      } catch {
        /* Cross-origin frames must not be accessed. */
      }
    }
    return false
  }
  if (!Array.from(combo.options).some((option) => option.value === code)) {
    // Google adds English after translation starts. Older widgets expose it
    // only through the native, same-origin "Show original" banner control.
    if (code === "en") {
      if (restoreOriginal()) return
    }
    throw new Error(
      code === "en"
        ? "Google’s original-language control is not ready. Please try again."
        : "Google Translate does not currently offer this language.",
    )
  }
  combo.value = code
  combo.dispatchEvent(new Event("change", { bubbles: true }))
  // Translating to English does not necessarily restore Google's original DOM.
  if (
    code === "en" &&
    !restoreOriginal() &&
    (document.documentElement.classList.contains("translated-ltr") ||
      document.documentElement.classList.contains("translated-rtl"))
  ) {
    throw new Error(
      "Google’s original-language control is not ready. Please try again.",
    )
  }
}
