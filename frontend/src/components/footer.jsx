import React from 'react'

export default function Footer() {
  return (
     <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>K_Code</h3>
              <p>Empowering developers through quality content and community.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#tutorials">Tutorials</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://x.com/@karan_k_code"><i className="fab fa-twitter"></i></a>
                <a href="https://github.com/karan-k-code"><i className="fab fa-github"></i></a>
                <a href="https://karan_k_code"><i className="fab fa-linkedin"></i></a>
                <a href="https://karan_k_code"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 K_Code. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
