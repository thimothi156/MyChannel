import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Modal from "react-modal";

Modal.setAppElement("#react-root");


document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("react-root")

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<App />)
  }
})