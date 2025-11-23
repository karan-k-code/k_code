import React, { useState } from 'react'
import Content from '../components/content'
import { Tutorial } from '../components/data'
import TableContent from '../components/tableContent'
import BlogHero from '../components/bloghero'
import Aside from '../components/aside'
import CommentSecation from '../components/comment'

export default function Post() {



  const { dec, img, note } = Tutorial;
 
  return (
    <>
      <BlogHero {...Tutorial}/>

       <main className="post-container">
        <article className="post-content">
          <div className="container">

          {/* <!-- Featured Image --> */}
          <figure className="featured-image">
            <img
              src={img}
              alt="JavaScript Fundamentals"
            />
            <figcaption>
              {note}
            </figcaption>
          </figure>

          {/* <!-- Introduction --> */}
          <p>{dec}</p>
      <TableContent content={Tutorial.content} />

       <div className="video-responsive">
             <iframe
    src="https://www.youtube.com/embed/xeOttl1d2bo?si=g77VQaqr7GFDw0p4"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
            </div>

      {Tutorial.content.map((x,i)=><Content key={i} {...x} language={Tutorial.language}/>)}

          </div>
        </article>


        <Aside author={Tutorial.author}/>

       </main> 
       <CommentSecation/>

    </>
  )
}
