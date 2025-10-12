import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navLinksRef = useRef(null)

  // Close menu when route changes or on click outside
  useEffect(() => {
    function onDocumentClick(e) {
      if (!navLinksRef.current) return
      if (!navLinksRef.current.contains(e.target) && !e.target.classList.contains('hamburger') && open) {
        setOpen(false)
      }
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
      <div className="container">
        <Link to="/" className="logo">K_Code</Link>
        <ul className={`nav-links ${open ? 'active' : ''}`} ref={navLinksRef}>
          <li><Link to="/">Home</Link></li>
          <li><a href="#tutorials">Tutorials</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
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