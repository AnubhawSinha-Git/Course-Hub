import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addCourse, getYouTubeThumbnail } from './courseStore'
import './AddCourse.css'

const CATEGORIES = [
  'Web Development', 'Data Science', 'Machine Learning', 'DevOps',
  'Mobile Development', 'UI/UX Design', 'DSA & Algorithms',
  'System Design', 'Database', 'Cloud Computing', 'Cybersecurity', 'Other',
]

const STATUSES = ['Not Started', 'In Progress', 'Completed']

const initial = { title: '', url: '', instructor: '', category: '', description: '', status: 'Not Started' }

const AddCourse = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [thumb, setThumb] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (name === 'url') setThumb(getYouTubeThumbnail(value))
  }

  const validate = () => {
    const err = {}
    if (!form.title.trim()) err.title = 'Course title is required'
    if (!form.url.trim()) {
      err.url = 'YouTube URL is required'
    } else {
      try {
        const u = new URL(form.url)
        if (!u.hostname.includes('youtube') && u.hostname !== 'youtu.be')
          err.url = 'Must be a valid YouTube URL'
      } catch {
        err.url = 'Enter a valid URL'
      }
    }
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    if (Object.keys(err).length) {
      setErrors(err)
      toast.error('Please fix the errors below')
      return
    }
    setSubmitting(true)
    addCourse(form)
    toast.success(`✓ "${form.title}" added to your library!`)
    setTimeout(() => navigate('/view-courses'), 400)
  }

  const handleReset = () => {
    setForm(initial)
    setErrors({})
    setThumb(null)
  }

  return (
    <div className="add-page">
      {/* Page header */}
      <div className="add-page-header">
        <div className="add-page-icon">
          <i className="fas fa-circle-plus" />
        </div>
        <div>
          <h1 className="add-page-title">Add New Course</h1>
          <p className="add-page-sub">Save a YouTube course to your Course-Hub library</p>
        </div>
      </div>

      <div className="add-layout">
        {/* Form */}
        <form className="add-form" onSubmit={handleSubmit} noValidate>

          <div className={`fg ${errors.title ? 'fg--error' : ''}`}>
            <label className="fg-label">Course Title <span className="req">*</span></label>
            <input
              type="text"
              name="title"
              className="fg-input"
              placeholder="e.g. React 19 Full Course 2025"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
            {errors.title && <span className="fg-err"><i className="fas fa-circle-exclamation" /> {errors.title}</span>}
          </div>

          <div className={`fg ${errors.url ? 'fg--error' : ''}`}>
            <label className="fg-label">YouTube URL <span className="req">*</span></label>
            <div className="fg-input-wrap">
              <i className="fab fa-youtube fg-icon" style={{ color: '#ff2d55' }} />
              <input
                type="url"
                name="url"
                className="fg-input fg-input--icon"
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.url}
                onChange={handleChange}
              />
            </div>
            {errors.url && <span className="fg-err"><i className="fas fa-circle-exclamation" /> {errors.url}</span>}
          </div>

          <div className="fg-row">
            <div className="fg">
              <label className="fg-label">Instructor / Channel</label>
              <input
                type="text"
                name="instructor"
                className="fg-input"
                placeholder="e.g. Traversy Media"
                value={form.instructor}
                onChange={handleChange}
              />
            </div>
            <div className="fg">
              <label className="fg-label">Category</label>
              <select name="category" className="fg-input fg-select" value={form.category} onChange={handleChange}>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="fg">
            <label className="fg-label">Status</label>
            <div className="status-row">
              {STATUSES.map(s => (
                <label key={s} className={`status-opt ${form.status === s ? 'status-opt--on' : ''}`}>
                  <input type="radio" name="status" value={s} checked={form.status === s} onChange={handleChange} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="fg">
            <label className="fg-label">Description</label>
            <textarea
              name="description"
              className="fg-input fg-textarea"
              placeholder="What will you learn? Any notes for yourself…"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="add-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              <i className="fas fa-plus" />
              {submitting ? 'Adding…' : 'Add to Library'}
            </button>
            <button type="button" className="btn-reset" onClick={handleReset}>
              <i className="fas fa-rotate-left" /> Reset
            </button>
          </div>
        </form>

        {/* Preview */}
        <aside className="add-preview">
          <p className="preview-label"><i className="fas fa-eye" /> Live Preview</p>
          <div className="preview-card">
            <div className="preview-thumb">
              {thumb
                ? <img src={thumb} alt="preview" />
                : (
                  <div className="preview-ph">
                    <i className="fab fa-youtube" />
                    <span>Enter a YouTube URL<br />to see thumbnail</span>
                  </div>
                )
              }
            </div>
            <div className="preview-body">
              <h4 className="preview-title">
                {form.title || <span className="preview-empty">Course title…</span>}
              </h4>
              {form.instructor && (
                <p className="preview-instructor"><i className="fas fa-user-tie" /> {form.instructor}</p>
              )}
              {form.category && (
                <span className="preview-category">{form.category}</span>
              )}
              {form.description && (
                <p className="preview-desc">{form.description}</p>
              )}
            </div>
          </div>

          <div className="preview-tips">
            <p className="preview-tip-title"><i className="fas fa-lightbulb" /> Tips</p>
            <ul>
              <li>Paste any YouTube link — watch, playlist or channel</li>
              <li>Click the status badge on a card to cycle it</li>
              <li>All data is stored locally in your browser</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AddCourse
