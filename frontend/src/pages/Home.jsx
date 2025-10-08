import React, { useEffect, useRef } from 'react'
import TutorialCard from '../components/tutorial'
import ProjectCard from '../components/projectcard'
import HeroSecation from '../components/herosecation'


const TutorialData=[{
    id:1,
    title:'JavaScript ES6 Features',
    dec:'Learn about the latest ES6 features including arrow functions, template literals, and more.',
    img:'image/pexels-fauxels-3183165.jpg'
},{
    id:2,
    title:'CSS Grid Layout',
    dec:'Master the CSS Grid layout system to create complex responsive designs with ease.',
    img:'image/pexels-fauxels-3184423.jpg'
},{
    id:3,
    title:'React Hooks Guide',
    dec:'Understand how to use React Hooks to simplify your functional components.',
    img:'image/pexels-flodahm-699459.jpg'
},]

const ProjectData=[{
    id:1,
    title:'Task Manager App',
    dec:'A full-stack task management application built with React and Node.js.',
    img:'image/pexels-nguyendesigner-236397.jpg'
},{
    id:2,
    title:'Weather Dashboard',
    dec:'Real-time weather information using the OpenWeather API.',
    img:'image/pexels-shkrabaanthony-5816283.jpg'
}]




export default function Home() {
  const codeRef = useRef(null)

  useEffect(() => {
    // sticky navbar class handled globally in CSS/ Navbar
    // close mobile nav when clicking a link is handled in Navbar
  }, [])

  function copyCode() {
    const el = codeRef.current
    if (!el) return
    navigator.clipboard.writeText(el.textContent).then(() => {
      // temporary visual feedback
      const original = el.dataset.copied
      el.dataset.copied = 'true'
      setTimeout(() => (el.dataset.copied = original || ''), 1500)
    }).catch(err => console.error('copy failed', err))
  }

  return (
    <div>
      <HeroSecation/>

      <section id="tutorials" className="section">
        <div className="container">
          <h2>Latest Tutorials</h2>
          <div className="tutorial-grid">
            {TutorialData.map((x,i)=><TutorialCard key={i} {...x} />)}
          </div>
        </div>
      </section>

      <section className="code-section">
        <div className="container">
          <h2>Try This Code Example</h2>
          <div className="code-container">
            <div className="code-header">
              <span>JavaScript</span>
              <button className="copy-btn" onClick={copyCode} aria-label="Copy code">
                <i className="far fa-copy"></i> Copy
              </button>
            </div>
            <pre id="code1" className="code-block"><code ref={codeRef}>{`// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120`}</code></pre>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {ProjectData.map((x,i)=><ProjectCard key={i} {...x}/>)}
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <h2>About K_Code</h2>
          <p>K_Code is a programming blog dedicated to helping developers of all levels improve their skills. Our mission is to provide clear, concise, and practical coding tutorials that you can apply to real-world projects.</p>
          <p>Founded in 2025, we've grown into a community of thousands of developers who share our passion for clean code and continuous learning.</p>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); e.currentTarget.reset(); }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </section>

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
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 K_Code. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
