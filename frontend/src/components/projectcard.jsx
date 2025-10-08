import React from 'react'

export default function ProjectCard({title,dec,img,id}) {

  return (
       <article className="project-card">
            <img src={img} alt={"Project "+id} />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{dec}</p>
                <a href={'project/'+img} className="btn">View Project</a>
            </div>
        </article>
  )
}
