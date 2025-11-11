import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

function ChatPage() {

  const {logout} = useAuthStore()

  return (
    <div className='z-10'>
      <h1>Chatpate</h1>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default ChatPage
