import React from "react"
import ReactDOM from "react-dom/client"
import "@fontsource/lato"
import "@fontsource/open-sans"
import App from "./App"
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
