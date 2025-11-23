import React, { useEffect, useState } from 'react'
import ProjectCardv1 from '../components/project-card-v1'
import TutorialCard_v1 from '../components/tutorial_v1'
import { TutorialData, ProjectData } from '../components/data'
import { main } from '../components/al-text'
import { useParams } from 'react-router-dom'

 

export default function Search() {
    const [aitext,setaitext]=useState('')

      const {value}=useParams()

    // useEffect(async()=>{

    // //    const test = await main(value)
    //     // setaitext(test)

    //    return  ()=>{
    //         return 0
    //     }
    // },[1])


  return (

    <>
    <p>{aitext}</p>
        <div className='section'> 
            <div className='container contenr-project-s'>
                <h2>Tutorials</h2>
                <div className='projects-page-se'>
                    {TutorialData.map((x,i)=><TutorialCard_v1 key={i} {...x} />)}
                </div>
            </div>
        </div>
        <div className='section'> 
            <div className='container contenr-project-s'>
                <h2>Projects</h2>
                <div className='projects-page-se'>
                   {ProjectData.map((x,i)=><ProjectCardv1 key={i} {...x} />)}
                </div>
            </div>
        </div>
    </>
  )
}

