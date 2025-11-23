import React from 'react'
import TutorialCard from '../components/tutorial'
import { TutorialData ,ProjectData} from '../components/data'
import TutorialCard_v1 from '../components/tutorial_v1'


export default function Tutorials() {
  return (
    <div className='section'> 
      <div className='container contenr-project-s'>
        <div className='projects-page-se'>
           {TutorialData.map((x,i)=><TutorialCard_v1 key={i} {...x} />)}
        </div>
        </div>
    </div>
  )
}
