import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import Frame from './FrameApp.jsx'


const LeFonde = <Frame />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {LeFonde}
  </StrictMode>,
)
