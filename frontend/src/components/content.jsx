import React from 'react'
import Code from './code'
import PointContent from './point_content'

export default function Content({language,code,title,text,id,pointdata}) {

  return (
    <div>
      <section id={id}>
        <h2>{title}</h2>
          {/* If `text` contains HTML (like <code> tags), render it as HTML so tags are honored.
              Note: this uses dangerouslySetInnerHTML — sanitize `text` before using untrusted input. */}
          {typeof text === 'string' && /<[^>]+>/.test(text) ? (
            <p dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            <p>{text}</p>
          )}
        <Code language={language} code={code}/>
        <PointContent {...pointdata}/>
      </section>
    </div>
  )
}
