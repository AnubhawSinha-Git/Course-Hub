import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#ff2d55"/>
            </svg>
          </div>
          <span className="logo-text">
            Course<span className="logo-accent">-Hub</span>
          </span>
        </Link>

        <div className="header-sep" />
        <span className="header-tagline">YouTube Learning Manager</span>

        <nav className="header-nav">
          <Link to="/" className="hn-link">Dashboard</Link>
          <Link to="/view-courses" className="hn-link">Library</Link>
          <Link to="/add-course" className="hn-btn">
            <i className="fas fa-plus" />
            Add Course
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
