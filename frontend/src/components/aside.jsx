import React  from 'react'

import Author from './author'
import Resources from './resources'
import PracticeExercises from './practiceExercises'

export default function Aside({author}) {
    
  return (
    <aside className="sidebar">
          
          <Author {...author} />

        <Resources/>
          
          <PracticeExercises/>

         
        </aside>
  )
}
