import React from 'react'

export default function TutorialCard({title,img,dec,id}) {

  return (
            <article className="tutorial-card">
              <img src={img} alt="React Tutorial" />
              <div className="card-content">
                <h3>{title}</h3>
                <p>{dec}</p>
                <a href={'post/'+id} className="read-more">Read More</a>
              </div>
            </article>
  )
}
