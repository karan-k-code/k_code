import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function togglePassword() {
    setShowPassword(s => !s)
  }

  function validate() {
    if (!emailOrUsername.trim()) { alert('Please enter your email or username'); return false }
    if (!password.trim()) { alert('Please enter your password'); return false }
    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = { emailOrUsername, password }
    console.log('Login attempt:', payload)
    alert('Login successful (simulated). Redirecting...')
    // In a real app, authenticate via API and redirect
  }

  function handleSocial(provider) {
    alert(`In a real app, this would initiate ${provider} OAuth flow`)
  }

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Log in to access your account</p>
        </div>

        <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email or Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input type="text" id="loginEmail" name="loginEmail" required placeholder="you@example.com or coder123" value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type={showPassword ? 'text' : 'password'} id="loginPassword" name="loginPassword" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="toggle-password" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={togglePassword}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="forgot-password"><a href="#">Forgot password?</a></div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="btn btn-auth">Log In</button>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </form>

        <div className="auth-social">
          <p>Or log in with</p>
          <div className="social-buttons">
            <button type="button" className="btn-social google" onClick={() => handleSocial('Google')}><i className="fab fa-google"></i> Google</button>
            <button type="button" className="btn-social github" onClick={() => handleSocial('GitHub')}><i className="fab fa-github"></i> GitHub</button>
          </div>
        </div>
      </div>

      <div className="auth-image">
        <img src="/public/image/pexels-djordje-petrovic-590080-2102416.jpg" alt="Coding illustration" />
      </div>
    </main>
  )
}
