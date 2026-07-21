import { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Frame from './FrameApp.jsx'
import Body from './BodyApp.jsx'

function App() {
  const [log, setLog] = useState(false)
  return (
    !log ? <Login logueado={setLog} /> : <Frame />
  )
}

export default App