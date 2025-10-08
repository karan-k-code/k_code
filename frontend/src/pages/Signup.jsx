import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState({ text: 'Weak', width: '20%', color: '#e74c3c' })

  useEffect(() => { updatePasswordStrength(password) }, [password])

  function togglePassword() { setShowPassword(s => !s) }

  function updatePasswordStrength(pw) {
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/\d/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    if (s === 0) setStrength({ text: 'Weak', width: '20%', color: '#e74c3c' })
    else if (s === 1) setStrength({ text: 'Fair', width: '40%', color: '#f39c12' })
    else if (s === 2 || s === 3) setStrength({ text: 'Good', width: '70%', color: '#3498db' })
    else setStrength({ text: 'Strong', width: '100%', color: '#2ecc71' })
  }

  function validate() {
    if (username.length < 4 || username.length > 20) { alert('Username must be between 4-20 characters'); return false }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email'); return false }
    if (password.length < 8) { alert('Password must be at least 8 characters'); return false }
    if (password !== confirmPassword) { alert('Passwords do not match'); return false }
    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const payload = { username, email }
    console.log('Signup', payload)
    alert('Account created successfully (simulated).')
  }

  function handleSocial(provider) { alert(`In a real app, this would initiate ${provider} OAuth flow`) }

  return (
    <main className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join our developer community</p>
        </div>

        <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input type="text" id="username" name="username" required placeholder="coder123" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <small className="input-hint">Must be 4-20 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input type="email" id="email" name="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="toggle-password" aria-label="Show password" onClick={togglePassword}><i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i></button>
            </div>
            <small className="input-hint">8+ characters with uppercase, number, and symbol</small>
            <div className="password-strength" style={{marginTop:8}}>
              <div className="strength-bar" style={{background:'#eee', width:'100%', height:8, borderRadius:3}}>
                <span style={{display:'block', width: strength.width, background: strength.color, height:'100%', borderRadius:3, transition:'width 0.3s'}}></span>
              </div>
              <span className="strength-text">{strength.text}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" required placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>

          <button type="submit" className="btn btn-auth">Sign Up</button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>

        <div className="auth-social">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button type="button" className="btn-social google" onClick={() => handleSocial('Google')}><i className="fab fa-google"></i> Google</button>
            <button type="button" className="btn-social github" onClick={() => handleSocial('GitHub')}><i className="fab fa-github"></i> GitHub</button>
          </div>
        </div>
      </div>

      <div className="auth-image">
        <img src="/public/image/pexels-cottonbro-7430341.jpg" alt="Coding illustration" />
      </div>
    </main>
  )
}
