import React, { useEffect, useRef } from 'react'
import TutorialCard from '../components/tutorial'
import ProjectCard from '../components/projectcard'
import HeroSecation from '../components/herosecation'
import {ProjectData,TutorialData} from '../components/data'
import ContactUs from '../components/contact_us'
import Footer from '../components/footer'
import Code from '../components/code'

export default function Home() {
  const codeRef = useRef(null)

  useEffect(() => {
    // sticky navbar class handled globally in CSS/ Navbar
    // close mobile nav when clicking a link is handled in Navbar
  }, [])

  function copyCode(event) {

    const btn = event.currentTarget

    const el = codeRef.current
    if (!el) return
    navigator.clipboard.writeText(el.textContent).then(() => {
      // temporary visual feedback
      const original = el.dataset.copied
      el.dataset.copied = 'true'
      setTimeout(() => (el.dataset.copied = original || ''), 1500)
    }).catch(err => console.error('copy failed', err))

        // temporary UI feedback on the button
    const originalHtml = btn.innerHTML
    const originalBg = btn.style.backgroundColor
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
    btn.style.backgroundColor = '#4CAF50'

    setTimeout(() => {
      btn.innerHTML = originalHtml
      btn.style.backgroundColor = originalBg
    }, 2000)

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

          {/* <Code language={'JavaScript'} code={`// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120`} /> */}

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

      <ContactUs/>
      <Footer/>
    </div>
  )
}

