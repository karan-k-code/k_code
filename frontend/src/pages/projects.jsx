import React from 'react'
import ProjectCard from '../components/projectcard'
import TutorialCard from '../components/tutorial'
import ProjectCardv1 from '../components/project-card-v1'
import { ProjectData,TutorialData } from '../components/data'

export default function Projects() {
  return (
    <div className='section'> 
      <div className='container contenr-project-s'>
        <div className='projects-page-se'>
           {ProjectData.map((x,i)=><ProjectCardv1 key={i} {...x} />)}
        </div>
        </div>
    </div>
  )
}
