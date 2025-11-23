import React from 'react'

export default function CommentSecation() {
  return (
    //   <!-- Comments Section -->
    <section className="comments-section">
      <div className="container">
        <h2>Discussion (3)</h2>

        <form className="comment-form">
          <textarea placeholder="Join the discussion..." required></textarea>
          <button type="submit" className="btn">Post Comment</button>
        </form>

        <div className="comments-list">
          <div className="comment">
            <div className="comment-author">
              <img src="../public/image/karan_a.jpg" alt="User" />
              <div>
                <span className="author-name">Michael Chen</span>
                <span className="comment-date">June 16, 2023</span>
              </div>
            </div>
            <div className="comment-content">
              <p>
                Great article! The examples are very clear and helpful. I've
                been using arrow functions but didn't realize they don't have
                their own 'this' binding. That explains some issues I've been
                having.
              </p>
            </div>
          </div>

          <div className="comment">
            <div className="comment-author">
              <img src="../public/image/karan_a.jpg" alt="User" />
              <div>
                <span className="author-name">Emma Rodriguez</span>
                <span className="comment-date">June 17, 2023</span>
              </div>
            </div>
            <div className="comment-content">
              <p>
                Could you do a follow-up on ES7 and ES8 features? I'd love to
                see async/await explained in this same clear style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
