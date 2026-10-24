import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './router'
import './index.css'
import './theme-dark.css'
import { applyTheme, initialTheme } from './theme'
import App from './App.jsx'

applyTheme(initialTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
