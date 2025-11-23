import React, { useState, useEffect, useRef } from 'react'
import '../styles/utile.css'
import '../styles/navbar-footer.css'
import { Link, useLocation } from 'react-router-dom'
import { theme,setLightTheme,setDarkTheme } from './f'
import ContactUs from './contact_us'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navLinksRef = useRef(null)
  const [darkmode, setDarkmode]=useState(false)
  const location = useLocation()
  const [activeEl, setActiveEl] = useState('')

  const searchInputRef = useRef(null)

  const navigate=useNavigate()

 

  // Initialize theme on mount: read saved value, fall back to OS preference
  useEffect(() => {
    const dar = localStorage.getItem('theme')

    if (dar === 'Light') {
      setDarkmode(false)
      setLightTheme()
    } else if (dar === 'Dark') {
      setDarkmode(true)
      setDarkTheme()
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      const prefersDark = !!systemPrefersDark && systemPrefersDark.matches
      if (prefersDark) {
        setDarkmode(true)
        setDarkTheme()
      } else {
        setDarkmode(false)
        setLightTheme()
      }
    }
  }, [])
  // Update active element based on current location
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/tutorials')) {
      setActiveEl('tutorials')
    } else if (path.includes('/projects')) {
      setActiveEl('projects')
    } else if (path.includes('/about')) {
      setActiveEl('about')
    } else if (path.includes('/contact')) {
      setActiveEl('contact')
    } else {
      setActiveEl('')
    }
  }, [location.pathname])

  const clickdarkmodebtn = () => {
    setDarkmode((prev) => {
      const next = !prev
      if (next) {
        setDarkTheme()
        localStorage.setItem('theme', 'Dark')
      } else {
        setLightTheme()
        localStorage.setItem('theme', 'Light')
      }
      return next
    })
  }

  // search input
    const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const text = searchInputRef.current.value.trim()
      if (text) {

         // 1. Fixed: Added encodeURIComponent to handle spaces/symbols in URLs
        navigate('../search/' + encodeURIComponent(text)); 
        
        // 2. Fixed: Use .blur() to remove focus (unfocus) the input
        if (searchInputRef.current) {
            searchInputRef.current.blur(); 
        }
        
        // searchInputRef.current.value = ""
      }
    }
  }


  // Close menu when route changes or on click outside
  useEffect(() => {
    function onDocumentClick(e) {
      // if (!navLinksRef.current) return
      // if (!navLinksRef.current.contains(e.target) && !e.target.classList.contains('hamburger') && open) {
      //   setOpen(false)
      // }
    }
    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [open])

  // Smooth scroll for in-page anchors (works when links use hash)
  useEffect(() => {
    function onAnchorClick(e) {
      const href = e.target.getAttribute('href')
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href)
        if (el) {
          e.preventDefault()
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
          setOpen(false)
        }
      }
    }

    const links = document.querySelectorAll('a')
    links.forEach((l) => l.addEventListener('click', onAnchorClick))
    return () => links.forEach((l) => l.removeEventListener('click', onAnchorClick))
  }, [])

  return (
    <nav className={`navbar ${open ? 'open' : ''}`}>
      <div className="container-nav">
        <Link to="/" className="logo flex-con">K_Code</Link>

        <div className='search-input-div'>
          <label></label>
          <input type="text" ref={searchInputRef} onKeyDown={handleTagInput} placeholder='Search anything' />
          
        </div>

        <ul className={`nav-links ${open ? 'active' : ''}`} ref={navLinksRef}>
          <li ><a href="/tutorials" className={activeEl=='tutorials'?'ativeEl':''}>Tutorials</a></li>
          <li ><a href="/projects" className={activeEl=='projects'?'ativeEl':''}>Projects</a></li>
          <li ><a href="/about" className={activeEl=='about'?'ativeEl':''}>About</a></li>
          <li ><a href="/contact" className={activeEl=='contact'?'ativeEl':''}>Contact</a></li>
          <li>
            <div className="checkbox-apple">
                <input
                  className="yep"
                  id="check-apple"
                  type="checkbox"
                  checked={darkmode}
                  onChange={clickdarkmodebtn}
                />
                <label htmlFor="check-apple"></label>
             </div>
          </li>
        </ul>

        <button className={`hamburger ${open ? 'toggle' : ''}`} aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </div>
    </nav>
  )
}