import './main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hub from './components/frontPage/hub.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hub />
  </StrictMode>
)
