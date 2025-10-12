import React, { useRef, useEffect } from 'react'

export default function Code({ language, code }) {
  const codeRef = useRef(null)

  function copyCode(event) {
    // event.currentTarget is the button that was clicked
    const btn = event.currentTarget
    if (!codeRef.current) return

    const codeText = codeRef.current.textContent || ''

    // Use Clipboard API when available, fallback to textarea+execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(codeText)
        .catch((err) => console.error('Failed to copy code: ', err))
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = codeText
      // keep off-screen
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error('Fallback: unable to copy', err)
      }
      document.body.removeChild(textarea)
    }

    // temporary UI feedback on the button
    const originalHtml = btn.innerHTML
    const originalBg = btn.style.backgroundColor
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!'
    btn.style.backgroundColor = '#4CAF50'

    setTimeout(() => {
      btn.innerHTML = originalHtml
      btn.style.backgroundColor = originalBg
    }, 2000)
  }

  useEffect(() => {
    // If highlight.js is loaded globally, highlight this code block
    if (window.hljs && codeRef.current) {
      try {
        window.hljs.highlightElement(codeRef.current)
      } catch (e) {
        // ignore
      }
    }
  }, [code])

  return (
    <div className="code-container">
      <div className="code-header">
        <span>{language}</span>
        <button type="button" className="copy-btn" onClick={copyCode}>
          <i className="far fa-copy"></i> Copy
        </button>
      </div>
      <pre className="code-block">
        <code
          ref={codeRef}
          className={language ? language.toLowerCase() : 'plaintext'}
        >
          {`${code}`}
        </code>
      </pre>
    </div>
  )
}
