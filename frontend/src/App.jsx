import React from 'react'
import ChatPage from './pages/ChatPage'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] relative flex items-center justify-center p-4 overflow-hidden'>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3)_0%,transparent_70%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
      
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      
    </div>

  )
}

export default App
