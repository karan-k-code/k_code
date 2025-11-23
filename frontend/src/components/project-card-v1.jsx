import React from 'react'

export default function ProjectCardv1({title,dec,img,id}) {
  return (
        <article className="project-card-v1">
            <img src={img} alt={"Project "+id} />
            <div className="card-content-p">
                <h3>{title}</h3>
                <p>{dec}</p>
            </div>
        </article>
  )
}
