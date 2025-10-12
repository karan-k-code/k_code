import React from 'react'

export default function Author({img,name,dec,details}) {
  return (
    <div className="sidebar-widget">
            <h3>About the Author</h3>
            <div className="author-card">
                <img src={img} alt={name} />
              <h4>{name}</h4>
              <p>{details}</p>
              <div className="social-links" >
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
  )
}
