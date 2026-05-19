import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadCourses } from './courseStore'
import Course from './Course'
import './Home.css'

const stats = (courses) => [
  { label: 'Total',       value: courses.length,                                              icon: 'fa-layer-group',  color: '#ff2d55' },
  { label: 'Completed',   value: courses.filter(c => c.status === 'Completed').length,        icon: 'fa-circle-check', color: '#30d158' },
  { label: 'In Progress', value: courses.filter(c => c.status === 'In Progress').length,      icon: 'fa-spinner',      color: '#ffd60a' },
  { label: 'Not Started', value: courses.filter(c => !c.status || c.status === 'Not Started').length, icon: 'fa-clock', color: '#0a84ff' },
]

const Home = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => { setCourses(loadCourses()) }, [])

  const recent = [...courses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  const s = stats(courses)

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-badge">
          <i className="fab fa-youtube" /> YouTube Course Tracker
        </div>
        <h1 className="hero-title">
          Your Learning<br />
          <span className="hero-accent">Command Centre</span>
        </h1>
        <p className="hero-sub">
          Add, organise and track every YouTube course in one sleek dashboard. 
          Never lose your place again.
        </p>
        <div className="hero-cta">
          <Link to="/add-course" className="btn-primary">
            <i className="fas fa-plus" /> Add Course
          </Link>
          <Link to="/view-courses" className="btn-ghost">
            <i className="fas fa-layer-group" /> Browse Library
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-grid">
        {s.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-icon" style={{ color: item.color, background: `${item.color}1a` }}>
              <i className={`fas ${item.icon}`} />
            </div>
            <div className="stat-num">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="section-row">
        <h2 className="section-title">Recently Added</h2>
        {courses.length > 0 && (
          <Link to="/view-courses" className="section-more">
            View all <i className="fas fa-arrow-right" />
          </Link>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <i className="fab fa-youtube empty-state-icon" />
          <h3>No courses yet</h3>
          <p>Add your first YouTube course to get started.</p>
          <Link to="/add-course" className="btn-primary">
            <i className="fas fa-plus" /> Add First Course
          </Link>
        </div>
      ) : (
        <div className="courses-grid">
          {recent.map(course => (
            <Course
              key={course.id}
              course={course}
              onDelete={(id) => setCourses(prev => prev.filter(c => c.id !== id))}
              onStatusChange={(id, status) =>
                setCourses(prev => prev.map(c => c.id === id ? { ...c, status } : c))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
