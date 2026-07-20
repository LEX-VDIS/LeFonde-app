import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Frame from './FrameApp.jsx'
import Body from './BodyApp.jsx'


const LeFonde = <Frame />

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {LeFonde}
    <div className="app-container"><Body/></div>
  </StrictMode>,
)
