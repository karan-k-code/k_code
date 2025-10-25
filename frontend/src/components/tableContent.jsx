import React,{useEffect} from 'react'

export default function TableContent(props) {

    const {content=[]}=props

  return (
          <div className="concept-box">
            <h2>Table of Contents</h2>
            <ol className="toc-list">
                {content.map((x,i)=>(<li key={i}><a href={'#'+x.id}>{x.title}</a></li>))}
            </ol>
          </div>
  )
}


  /* <li><a href="#variables">Variables and Data Types</a></li>
     <li><a href="#hoisting">Hoisting and Temporal Dead Zone</a></li>
     <li><a href="#scope">Scope and Closures</a></li>
     <li><a href="#functions">Functions and Arrow Functions</a></li>
     <li><a href="#objects">Objects and Prototypes</a></li>
     <li><a href="#async">Asynchronous JavaScript</a></li>
     <li><a href="#es6">ES6+ Features</a></li>
     <li><a href="#modules">Modules and Import/Export</a></li> */
