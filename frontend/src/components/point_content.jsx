import React from 'react'

const pointdata={
    title: 'Key Points',
    content:[
        `<code>let</code> and <code>const</code> are block-scoped (ES6+)`,
        `<code>const</code> doesn't make objects immutable, just prevents reassignment`,
        `JavaScript has dynamic typing (variables can change type)`],
    
    heightcolor:'important'
}

export default function PointContent(props) {

    const {title,content,heightcolor}=props

  return (
    <div className={`concept-box ${heightcolor}`}>
      <h4>{title}:</h4>
      <ul>{content.map((x,i)=>(<li key={i}> {typeof x === 'string' && /<[^>]+>/.test(x) ? (
            <text dangerouslySetInnerHTML={{ __html: x }} />
          ) : (
            <text>{x}</text>
          )}</li>))}</ul>
    </div>
  )
}

// todo: fix code <code></code>  error



//  <li>
//                   <code>let</code> and <code>const</code> are block-scoped
//                   (ES6+)
//                 </li>
//                 <li>
//                   <code>const</code> doesn't make objects immutable, just
//                   prevents reassignment
//                 </li>
//                 <li>
//                   JavaScript has dynamic typing (variables can change type)
//                 </li>