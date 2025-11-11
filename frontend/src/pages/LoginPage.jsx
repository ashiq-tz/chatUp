import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderAnimatedContainer from '../components/BoarderAnimatedContainer.jsx'
import { LoaderIcon, Mail, MessagesSquare, RectangleEllipsis } from 'lucide-react'
import { Link } from 'react-router'

function LoginPage() {

  const [formData,setFormData] = useState({email:"", password:""})
  const {login, isLoggingIn} = useAuthStore()

  const handleSubmit = (e) =>{
    e.preventDefault()

    login(formData)
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-0">
    <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
      <BorderAnimatedContainer>
        <div className="w-full flex flex-col md:flex-row">
          {/* form - left side */}
          <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                {/* heading with messg icon */}
                <MessagesSquare className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back !</h2>
                <p className="text-slate-400">please enter your details</p>
              </div>

              {/* form contents */}
              <form onSubmit={handleSubmit} className="space-y-6">
        
                {/* email */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className='relative'>

                    <Mail className="auth-input-icon"/>

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="Enter Your Mail"
                    />
                  </div>
                </div>

                {/* password */}
                <div>
                  <label className="auth-input-label">Password</label>
                  <div className='relative'>

                    <RectangleEllipsis className="auth-input-icon"/>

                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input"
                      placeholder="Enter Your Password"
                    />
                  </div>
                </div>

                {/* submit button */}
                <button className='auth-btn' type='submit' disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Log In"
                  )}
                </button>

              </form>

               {/* link to login page */}   
              <div className="mt-6 text-center">
                <Link to="/signup" className="auth-link">
                 Don't have an account? Sign up
                </Link>
              </div>

            </div>
          </div>

          {/* form - right side - image */} {/* for smaller (phone) screen it will be hidden */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
            <div>
              <img
                src="/login.png"
                alt="signup image"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">Talk. Share. Grow.</h3>

                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Secure</span>
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </BorderAnimatedContainer>
    </div>    
  </div>
  )
}

export default LoginPage
