import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadCourses } from './courseStore'
import Course from './Course'
import './Allcourses.css'

const STATUS_FILTERS = ['All', 'Not Started', 'In Progress', 'Completed']

const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az',     label: 'Title A → Z'  },
  { value: 'za',     label: 'Title Z → A'  },
]

const Allcourses = () => {
  const [courses, setCourses] = useState([])
  const [filter, setFilter]   = useState('All')
  const [search, setSearch]   = useState('')
  const [sort, setSort]       = useState('newest')

  useEffect(() => { setCourses(loadCourses()) }, [])

  const handleDelete = (id) => setCourses(prev => prev.filter(c => c.id !== id))
  const handleStatusChange = (id, status) =>
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status } : c))

  const filtered = courses
    .filter(c => {
      const okStatus  = filter === 'All' || (c.status || 'Not Started') === filter
      const q = search.toLowerCase()
      const okSearch  = !q ||
        c.title?.toLowerCase().includes(q) ||
        c.instructor?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
      return okStatus && okSearch
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sort === 'az') return (a.title||'').localeCompare(b.title||'')
      if (sort === 'za') return (b.title||'').localeCompare(a.title||'')
      return 0
    })

  const count = (f) => f === 'All'
    ? courses.length
    : courses.filter(c => (c.status || 'Not Started') === f).length

  return (
    <div className="all-page">
      {/* Header */}
      <div className="all-header">
        <div>
          <h1 className="all-title">Course Library</h1>
          <p className="all-sub">{courses.length} course{courses.length !== 1 ? 's' : ''} saved</p>
        </div>
        <Link to="/add-course" className="btn-add">
          <i className="fas fa-plus" /> Add Course
        </Link>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <i className="fas fa-magnifying-glass search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search title, instructor, category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              <i className="fas fa-xmark" />
            </button>
          )}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Filter pills */}
      <div className="pills">
        {STATUS_FILTERS.map(f => (
          <button
            key={f}
            className={`pill ${filter === f ? 'pill--on' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
            <span className="pill-n">{count(f)}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="all-empty">
          {courses.length === 0 ? (
            <>
              <i className="fab fa-youtube all-empty-icon" />
              <h3>Library is empty</h3>
              <p>Add your first YouTube course to get started.</p>
              <Link to="/add-course" className="btn-add">
                <i className="fas fa-plus" /> Add First Course
              </Link>
            </>
          ) : (
            <>
              <i className="fas fa-magnifying-glass all-empty-icon" />
              <h3>No results found</h3>
              <p>Try different search terms or filters.</p>
              <button className="btn-clear" onClick={() => { setFilter('All'); setSearch('') }}>
                Clear Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <p className="result-count">
            Showing {filtered.length} of {courses.length}
          </p>
          <div className="all-grid">
            {filtered.map(course => (
              <Course
                key={course.id}
                course={course}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Allcourses
