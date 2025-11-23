import React, { useState, useEffect, useRef } from 'react'
import '../styles/upload.css'
// Import highlight.js languages
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js";
import javascript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/javascript.min.js";
import python from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/python.min.js";
import java from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/java.min.js";
import csharp from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/csharp.min.js";
import cpp from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/cpp.min.js";
import php from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/php.min.js";
import ruby from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/ruby.min.js";
import go from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/go.min.js";
import typescript from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/languages/typescript.min.js";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("go", go);
hljs.registerLanguage("typescript", typescript);

const API_ENDPOINT = "https://your-api-endpoint.com/tutorials/create";

export default function UploadTutorials() {
  const [tags, setTags] = useState([])
  const [topics, setTopics] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [topicCounter, setTopicCounter] = useState(0)
  
  const formRef = useRef(null)
  const tagsInputRef = useRef(null)

  useEffect(() => {
    addNewTopic()
  }, [])

  const addTag = (tagText) => {
    if (!tagText.trim()) return
    if (tags.includes(tagText)) return
    setTags([...tags, tagText])
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const tag = tagsInputRef.current.value.trim()
      if (tag) {
        addTag(tag)
        tagsInputRef.current.value = ""
      }
    }
  }

  const addNewTopic = () => {
    const newTopic = {
      id: topicCounter + 1,
      title: "",
      description: "",
      code: "",
      language: "javascript",
      keyPoints: [],
      pitfalls: [],
      expanded: true
    }
    setTopics([...topics, newTopic])
    setTopicCounter(topicCounter + 1)
  }

  const updateTopic = (index, field, value) => {
    const updatedTopics = [...topics]
    updatedTopics[index][field] = value
    setTopics(updatedTopics)
  }

  const removeTopic = (index) => {
    if (topics.length > 1 || window.confirm("This is the only topic. Delete it?")) {
      setTopics(topics.filter((_, i) => i !== index))
    }
  }

  const moveTopicUp = (index) => {
    if (index > 0) {
      const updatedTopics = [...topics]
      ;[updatedTopics[index], updatedTopics[index - 1]] = [
        updatedTopics[index - 1],
        updatedTopics[index]
      ]
      setTopics(updatedTopics)
    }
  }

  const moveTopicDown = (index) => {
    if (index < topics.length - 1) {
      const updatedTopics = [...topics]
      ;[updatedTopics[index], updatedTopics[index + 1]] = [
        updatedTopics[index + 1],
        updatedTopics[index]
      ]
      setTopics(updatedTopics)
    }
  }

  const addKeyPoint = (topicIndex) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].keyPoints.push("")
    setTopics(updatedTopics)
  }

  const removeKeyPoint = (topicIndex, pointIndex) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].keyPoints.splice(pointIndex, 1)
    setTopics(updatedTopics)
  }

  const updateKeyPoint = (topicIndex, pointIndex, value) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].keyPoints[pointIndex] = value
    setTopics(updatedTopics)
  }

  const addPitfall = (topicIndex) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].pitfalls.push("")
    setTopics(updatedTopics)
  }

  const removePitfall = (topicIndex, pitfallIndex) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].pitfalls.splice(pitfallIndex, 1)
    setTopics(updatedTopics)
  }

  const updatePitfall = (topicIndex, pitfallIndex, value) => {
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].pitfalls[pitfallIndex] = value
    setTopics(updatedTopics)
  }

  const validateForm = () => {
    const form = formRef.current
    if (!form.tutorialTitle.value.trim()) {
      alert("Title is required")
      return false
    }
    if (!form.tutorialDescription.value.trim()) {
      alert("Description is required")
      return false
    }
    if (!form.tutorialCategory.value) {
      alert("Please select a category")
      return false
    }
    if (!form.tutorialLevel.value) {
      alert("Please select a difficulty level")
      return false
    }
    if (topics.some(t => !t.title.trim() || !t.description.trim())) {
      alert("All topics must have a title and description")
      return false
    }
    return true
  }

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  const handlePreview = () => {
    if (!validateForm()) return
    setShowPreview(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const form = formRef.current
    const formData = {
      title: form.tutorialTitle.value,
      description: form.tutorialDescription.value,
      category: form.tutorialCategory.value,
      level: form.tutorialLevel.value,
      tags: tags,
      visibility: form.visibility?.value || "public",
      allowComments: form.allowComments?.checked || false,
      topics: topics.map(t => ({
        title: t.title,
        description: t.description,
        code: t.code,
        language: t.language,
        keyPoints: t.keyPoints.filter(p => p.trim()),
        pitfalls: t.pitfalls.filter(p => p.trim())
      })),
      createdAt: new Date().toISOString()
    }

    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      alert("Tutorial published successfully!")
      window.location.href = `/tutorial/${data.id}`
    } catch (error) {
      console.error("Publish failed:", error)
      alert("Failed to publish tutorial. Please try again.")
    } finally {
      setLoading(false)
      setShowPreview(false)
    }
  }

  return (
    <main className="tutorial-upload-container">
      <div className="container">
        <h1>Create a New Tutorial</h1>
        <p className="subtitle">
          Share your knowledge with the developer community
        </p>

        {showPreview && (
          <div className="preview-modal">
            <div className="preview-content">
              <h2>Tutorial Preview</h2>
              <div className="preview-tutorial">
                <h3>{formRef.current?.tutorialTitle?.value}</h3>
                <p>{formRef.current?.tutorialDescription?.value}</p>
                <div className="preview-meta">
                  <span>Category: {formRef.current?.tutorialCategory?.value}</span>
                  <span>Level: {formRef.current?.tutorialLevel?.value}</span>
                </div>
                {tags.length > 0 && (
                  <div className="preview-tags">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="preview-topics">
                  {topics.map((topic, idx) => (
                    <div key={idx} className="preview-topic">
                      <h4>{topic.title}</h4>
                      <p>{topic.description}</p>
                      {topic.code && (
                        <pre><code className={`language-${topic.language}`}>{escapeHtml(topic.code)}</code></pre>
                      )}
                      {topic.keyPoints.length > 0 && (
                        <div>
                          <h5>Key Points:</h5>
                          <ul>
                            {topic.keyPoints.map((point, pidx) => (
                              <li key={pidx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {topic.pitfalls.length > 0 && (
                        <div>
                          <h5>Pitfalls:</h5>
                          <ul>
                            {topic.pitfalls.map((pitfall, pidx) => (
                              <li key={pidx}>{pitfall}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>Back to Edit</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Publishing..." : "Confirm & Publish"}
                </button>
              </div>
            </div>
          </div>
        )}

        <form ref={formRef} id="tutorialForm" className="tutorial-form" onSubmit={handleSubmit}>
          {/* Tutorial Metadata */}
          <div className="form-section">
            <h2>Tutorial Information</h2>

            <div className="form-group">
              <label htmlFor="tutorialTitle">Title *</label>
              <input type="text" id="tutorialTitle" name="tutorialTitle" required placeholder="Modern JavaScript Patterns" />
            </div>

            <div className="form-group">
              <label htmlFor="tutorialDescription">Description *</label>
              <textarea id="tutorialDescription" name="tutorialDescription" required placeholder="A comprehensive guide to modern JavaScript design patterns..."></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tutorialCategory">Category *</label>
                <select id="tutorialCategory" name="tutorialCategory" required>
                  <option value="">Select a category</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="webdev">Web Development</option>
                  <option value="mobile">Mobile</option>
                  <option value="datascience">Data Science</option>
                  <option value="algorithms">Algorithms</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutorialLevel">Difficulty Level *</label>
                <select id="tutorialLevel" name="tutorialLevel" required>
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tutorialTags">Tags</label>
              <div className="tags-input-container">
                <input type="text" ref={tagsInputRef} id="tutorialTags" onKeyDown={handleTagInput} placeholder="Add tags (press Enter)"/>
                <div className="tags-list">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                      <span className="tag-remove" onClick={() => removeTag(idx)}>&times;</span>
                    </span>
                  ))}
                </div>
              </div>
              <small className="hint">Separate tags with commas or press Enter</small>
            </div>
          </div>

          {/* Tutorial Topics */}
          <div className="form-section">
            <h2>Tutorial Topics</h2>
            <p className="section-description">
              Break down your tutorial into logical sections
            </p>

            <div className="topics-container">
              {topics.map((topic, topicIdx) => (
                <div key={topic.id} className={`topic-card ${topic.expanded ? 'expanded' : ''}`}>
                  <div className="topic-header" onClick={() => updateTopic(topicIdx, 'expanded', !topic.expanded)}>
                    <h3>{topic.title || `Topic ${topicIdx + 1}`}</h3>
                    <div className="topic-actions">
                      {topicIdx > 0 && (
                        <button type="button" className="btn-topic-action move-up" onClick={(e) => { e.stopPropagation(); moveTopicUp(topicIdx); }}>
                          ↑
                        </button>
                      )}
                      {topicIdx < topics.length - 1 && (
                        <button type="button" className="btn-topic-action move-down" onClick={(e) => { e.stopPropagation(); moveTopicDown(topicIdx); }}>
                          ↓
                        </button>
                      )}
                      <button type="button" className="btn-topic-action delete-topic" onClick={(e) => { e.stopPropagation(); removeTopic(topicIdx); }}>
                        ✕
                      </button>
                    </div>
                  </div>

                  {topic.expanded && (
                    <div className="topic-content">
                      <div className="form-group">
                        <label>Topic Title *</label>
                        <input type="text" value={topic.title} onChange={(e) => updateTopic(topicIdx, 'title', e.target.value)} placeholder="Topic title" />
                      </div>

                      <div className="form-group">
                        <label>Description *</label>
                        <textarea value={topic.description} onChange={(e) => updateTopic(topicIdx, 'description', e.target.value)} placeholder="Explain this topic..."></textarea>
                      </div>

                      <div className="form-group">
                        <label>Language</label>
                        <select value={topic.language} onChange={(e) => updateTopic(topicIdx, 'language', e.target.value)}>
                          <option value="javascript">JavaScript</option>
                          <option value="python">Python</option>
                          <option value="java">Java</option>
                          <option value="csharp">C#</option>
                          <option value="cpp">C++</option>
                          <option value="php">PHP</option>
                          <option value="ruby">Ruby</option>
                          <option value="go">Go</option>
                          <option value="typescript">TypeScript</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Code</label>
                        <textarea className="code-input" value={topic.code} onChange={(e) => updateTopic(topicIdx, 'code', e.target.value)} placeholder="Paste your code here..."></textarea>
                      </div>

                      <div className="form-group">
                        <label>Key Points</label>
                        <div className="key-points-container">
                          {topic.keyPoints.map((point, pointIdx) => (
                            <div key={pointIdx} className="point">
                              <input type="text" value={point} onChange={(e) => updateKeyPoint(topicIdx, pointIdx, e.target.value)} placeholder="Key point..." />
                              <button type="button" className="btn-remove-point" onClick={() => removeKeyPoint(topicIdx, pointIdx)}>✕</button>
                            </div>
                          ))}
                        </div>
                        <button type="button" className="btn btn-secondary add-point-btn" onClick={() => addKeyPoint(topicIdx)}>+ Add Key Point</button>
                      </div>

                      <div className="form-group">
                        <label>Common Pitfalls</label>
                        <div className="pitfalls-container">
                          {topic.pitfalls.map((pitfall, pitfallIdx) => (
                            <div key={pitfallIdx} className="pitfall">
                              <input type="text" value={pitfall} onChange={(e) => updatePitfall(topicIdx, pitfallIdx, e.target.value)} placeholder="Common pitfall..." />
                              <button type="button" className="btn-remove-pitfall" onClick={() => removePitfall(topicIdx, pitfallIdx)}>✕</button>
                            </div>
                          ))}
                        </div>
                        <button type="button" className="btn btn-secondary add-pitfall-btn" onClick={() => addPitfall(topicIdx)}>+ Add Pitfall</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="btn btn-secondary" onClick={addNewTopic}>
              + Add Topic
            </button>
          </div>

          {/* Tutorial Settings */}
          <div className="form-section">
            <h2>Publish Settings</h2>

            <div className="form-group">
              <label>Visibility *</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="visibility" value="public" defaultChecked />
                  <span className="radio-label">Public (Visible to everyone)</span>
                </label>
                <label>
                  <input type="radio" name="visibility" value="unlisted" />
                  <span className="radio-label">Unlisted (Only visible with link)</span>
                </label>
                <label>
                  <input type="radio" name="visibility" value="private" />
                  <span className="radio-label">Private (Only visible to me)</span>
                </label>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="allowComments" name="allowComments" defaultChecked />
              <label htmlFor="allowComments">Allow comments on this tutorial</label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handlePreview}>
              Preview
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Publishing..." : "Publish Tutorial"}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
