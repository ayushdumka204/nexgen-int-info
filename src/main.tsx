import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "./styles/refinements.css"
import "./styles/editorial-theme.css"
import ThemeProvider from "./components/theme/ThemeProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
