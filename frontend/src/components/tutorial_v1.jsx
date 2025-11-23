import React from 'react'
import '../styles/tutorial.css'
import { useNavigate } from 'react-router-dom'

export default function TutorialCard_v1({title,img,dec,id}) {
    const navigate=useNavigate()

  return (
            <article className="tutorial-card-v1" onClick={()=>navigate('/post/'+id)}>
              <img src={img} alt="React Tutorial" />
              <div className="card-content-v1">
                <h3>{title}</h3>
                <p>{dec}</p>
                <div className='user-div-v'>
                    <img src='../image/karan_a.jpg'></img>
                    <div className='username-date-v'>
                        <span>User name</span>
                        <span>Date</span>
                    </div>
                </div>
              </div>
            </article>
  )
}
