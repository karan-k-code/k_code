import React from 'react'

export default function BlogHero({author,title,createDate,language}) {
  return (
     <header className="post-header">
      <div className="container">
        <div className="post-meta">
          <span className="category">{language}</span>
          <span className="date">Published: {createDate}</span>
          <span className="reading-time">15 min read</span>
        </div>
        <h1 className="post-title">{title}</h1>
        <div className="author-info">
          <img
            src={author.img}
            alt="Author"
            className="author-img"
          />
          <div>
            <span className="author-name">{author.name}</span>
            <span className="author-title">{author.dec}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
