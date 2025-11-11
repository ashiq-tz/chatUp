import React, { useEffect } from 'react'
import ChatPage from './pages/ChatPage'
import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from 'react-hot-toast'

function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth) return <PageLoader />

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] relative flex items-center justify-center p-4 overflow-hidden'>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3)_0%,transparent_70%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
      
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
      </Routes>

      <Toaster />
      
    </div>

  )
}

export default App
