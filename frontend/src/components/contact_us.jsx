import React from 'react'

export default function ContactUs() {
  return (
    <section id="contact" className="section contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); e.currentTarget.reset(); }}>
            <div className="form-group-c">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required placeholder='Enter your name' />
            </div>
            <div className="form-group-c">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required placeholder='Enter your Email' />
            </div>
            <div className="form-group-c">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required placeholder='Type Your message'></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </section>
  )
}
