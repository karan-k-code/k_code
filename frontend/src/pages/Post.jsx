import React, { useState } from 'react'
import Content from '../components/content'
import { Tutorial } from '../components/data'
import TableContent from '../components/tableContent'
import BlogHero from '../components/bloghero'
import Aside from '../components/aside'

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

      {Tutorial.content.map((x,i)=><Content key={i} {...x} language={Tutorial.language}/>)}

          </div>
        </article>


        <Aside author={Tutorial.author}/>

       </main>    
    </>
  )
}
