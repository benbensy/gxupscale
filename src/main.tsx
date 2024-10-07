import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { init, app, events, window as win } from '@neutralinojs/lib'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

events.on('windowClose', () => app.exit())

init()
win.focus()