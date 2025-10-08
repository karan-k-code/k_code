import React, { useState, useRef, useEffect } from 'react'

const API_ENDPOINT = 'https://your-api-endpoint.com/code/upload'

export default function Upload() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [language, setLanguage] = useState('')
  const [tags, setTags] = useState('')
  const [code, setCode] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)

  const codeRef = useRef(null)
  const previewCodeRef = useRef(null)

  useEffect(() => {
    // If highlight.js is loaded globally, highlight preview
    if (previewOpen && window.hljs && previewCodeRef.current) {
      window.hljs.highlightElement(previewCodeRef.current)
    }
  }, [previewOpen])

  function handleIndent() {
    const textarea = codeRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value
    const before = value.slice(0, start)
    const selection = value.slice(start, end)
    const after = value.slice(end)
    const indented = selection.replace(/^/gm, '    ')
    const newVal = before + indented + after
    setCode(newVal)
    // restore selection
    requestAnimationFrame(() => {
      textarea.selectionStart = start
      textarea.selectionEnd = end + (indented.length - selection.length)
    })
  }

  function handleComment() {
    const textarea = codeRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = textarea.value
    const selection = value.slice(start, end)
    const comment = '//' + ' '
    const commented = selection.replace(/^/gm, comment)
    const newVal = value.slice(0, start) + commented + value.slice(end)
    setCode(newVal)
    requestAnimationFrame(() => {
      textarea.selectionStart = start
      textarea.selectionEnd = end + (commented.length - selection.length)
    })
  }

  function handleClear() {
    if (window.confirm('Are you sure you want to clear all code?')) {
      setCode('')
    }
  }

  function openPreview() {
    if (!title.trim()) { alert('Title is required'); return }
    if (!language) { alert('Please select a language'); return }
    if (!code.trim()) { alert('Code is required'); return }
    setPreviewOpen(true)
  }

  async function handleSubmit(e) {
    e?.preventDefault()
    if (!title.trim() || !language || !code.trim()) return
    setLoading(true)
    const payload = {
      title,
      description,
      language,
      code,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      visibility,
      createdAt: new Date().toISOString()
    }

    try {
      // simulate network delay if API not configured
      if (API_ENDPOINT.includes('your-api-endpoint')) {
        await new Promise(r => setTimeout(r, 900))
        alert('Code uploaded (simulated).')
      } else {
        const res = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!res.ok) throw new Error('Upload failed')
        const data = await res.json()
        window.location.href = `/code/${data.id}`
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed. See console for details.')
    } finally {
      setLoading(false)
      setPreviewOpen(false)
    }
  }

  function copyPreviewCode() {
    navigator.clipboard.writeText(code).then(() => {
      alert('Copied to clipboard')
    })
  }

  return (
    <div className="upload-container">
      <div className="container">
        <h1>Upload Your Code</h1>
        <p className="subtitle">Share your code snippets with the community</p>

        <form id="uploadForm" className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" id="title" name="title" required placeholder="My Awesome Algorithm" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" name="description" rows={3} placeholder="Explain what your code does..." />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language *</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} id="language" name="language" required>
                <option value="">Select a language</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="typescript">TypeScript</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input value={tags} onChange={e => setTags(e.target.value)} type="text" id="tags" name="tags" placeholder="algorithm, sorting, performance" />
              <small className="hint">Separate tags with commas</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="code">Your Code *</label>
            <div className="code-editor-container">
              <div className="editor-toolbar">
                <button type="button" className="btn-toolbar" onClick={handleIndent} title="Indent"><i className="fas fa-indent"></i></button>
                <button type="button" className="btn-toolbar" onClick={handleComment} title="Toggle Comment"><i className="fas fa-comment"></i></button>
                <button type="button" className="btn-toolbar" onClick={handleClear} title="Clear"><i className="fas fa-trash-alt"></i></button>
                <span className="language-display">{language || 'Plain Text'}</span>
              </div>
              <textarea id="code" ref={codeRef} value={code} onChange={e => setCode(e.target.value)} required spellCheck={false}></textarea>
              <pre className="syntax-highlight"><code id="highlightedCode"></code></pre>
            </div>
          </div>

          <div className="form-group">
            <label>Upload Options</label>
            <div className="radio-group">
              <label><input type="radio" name="visibility" value="public" checked={visibility==='public'} onChange={() => setVisibility('public')} /> <span className="radio-label">Public (Visible to everyone)</span></label>
              <label><input type="radio" name="visibility" value="unlisted" checked={visibility==='unlisted'} onChange={() => setVisibility('unlisted')} /> <span className="radio-label">Unlisted (Only visible with link)</span></label>
              <label><input type="radio" name="visibility" value="private" checked={visibility==='private'} onChange={() => setVisibility('private')} /> <span className="radio-label">Private (Only visible to me)</span></label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="submitBtn" disabled={loading}>{loading ? 'Uploading...' : 'Upload Code'}</button>
            <button type="button" className="btn btn-secondary" id="previewBtn" onClick={openPreview}>Preview</button>
          </div>
        </form>

        {previewOpen && (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Code Preview</h2>
                <button className="close-modal" onClick={() => setPreviewOpen(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <h3>{title}</h3>
                <p className="preview-description">{description || 'No description provided'}</p>
                <div className="preview-code-container">
                  <div className="preview-code-header">
                    <span>{language || 'Plain Text'}</span>
                    <button className="btn-copy" onClick={copyPreviewCode}><i className="far fa-copy"></i> Copy</button>
                  </div>
                  <pre className="preview-code"><code ref={previewCodeRef}>{code}</code></pre>
                </div>
                <div className="preview-tags">{tags.split(',').map(t => t.trim()).filter(Boolean).map(t => <span key={t}>{t}</span>)}</div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setPreviewOpen(false)}>Back to Editing</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Confirm Upload</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
