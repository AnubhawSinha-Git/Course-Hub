import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteCourse, updateCourse, getYouTubeThumbnail } from './courseStore'
import './Course.css'

const STATUS = {
  'Completed':   { bg: 'rgba(48,209,88,0.14)',  color: '#30d158', icon: 'fa-circle-check' },
  'In Progress': { bg: 'rgba(255,214,10,0.14)',  color: '#ffd60a', icon: 'fa-spinner'      },
  'Not Started': { bg: 'rgba(10,132,255,0.14)',  color: '#0a84ff', icon: 'fa-clock'        },
}

const Course = ({ course, onDelete, onStatusChange }) => {
  const [status, setStatus] = useState(course.status || 'Not Started')
  const [confirm, setConfirm] = useState(false)

  const s = STATUS[status] || STATUS['Not Started']
  const thumb = getYouTubeThumbnail(course.url)

  const handleDelete = () => {
    deleteCourse(course.id)
    toast.success(`"${course.title}" removed`)
    onDelete?.(course.id)
  }

  const cycleStatus = () => {
    const order = ['Not Started', 'In Progress', 'Completed']
    const next = order[(order.indexOf(status) + 1) % order.length]
    setStatus(next)
    updateCourse(course.id, { status: next })
    onStatusChange?.(course.id, next)
    toast.success(`Status → ${next}`)
  }

  const openUrl = () => {
    if (course.url) window.open(course.url, '_blank', 'noopener,noreferrer')
    else toast.error('No URL provided')
  }

  return (
    <div className="c-card">
      {/* Thumbnail */}
      <div className="c-thumb" onClick={openUrl} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && openUrl()}>
        {thumb
          ? <img src={thumb} alt={course.title} loading="lazy" />
          : <div className="c-thumb-ph"><i className="fab fa-youtube" /></div>
        }
        <div className="c-thumb-overlay">
          <div className="c-play"><i className="fas fa-play" /></div>
        </div>
      </div>

      {/* Body */}
      <div className="c-body">
        {/* Badges row */}
        <div className="c-badges">
          <button
            className="c-status-badge"
            style={{ background: s.bg, color: s.color }}
            onClick={cycleStatus}
            title="Click to change status"
          >
            <i className={`fas ${s.icon}`} />
            {status}
          </button>
          {course.category && (
            <span className="c-category">{course.category}</span>
          )}
        </div>

        <h3 className="c-title" title={course.title}>
          {course.title || 'Untitled Course'}
        </h3>

        {course.instructor && (
          <p className="c-instructor">
            <i className="fas fa-user-tie" /> {course.instructor}
          </p>
        )}

        {course.description && (
          <p className="c-desc">{course.description}</p>
        )}

        {/* Actions */}
        <div className="c-actions">
          <button className="c-btn-watch" onClick={openUrl}>
            <i className="fab fa-youtube" /> Watch
          </button>

          {!confirm ? (
            <button className="c-btn-del" onClick={() => setConfirm(true)} title="Delete">
              <i className="fas fa-trash-can" />
            </button>
          ) : (
            <div className="c-confirm">
              <span>Delete?</span>
              <button className="c-confirm-yes" onClick={handleDelete}>Yes</button>
              <button className="c-confirm-no" onClick={() => setConfirm(false)}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Course
