import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppEditable from './AppEditable.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEditable />
  </StrictMode>,
)
