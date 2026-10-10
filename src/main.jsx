import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeKeepAlive } from './lib/keepAlive'

// Start the Supabase keep-alive mechanism
initializeKeepAlive()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
