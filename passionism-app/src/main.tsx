import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PassionismApp from './PassionismApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PassionismApp />
  </StrictMode>,
)
