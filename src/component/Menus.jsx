import { NavLink } from 'react-router-dom'
import './Menus.css'

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'fa-house', exact: true },
  { path: '/add-course', label: 'Add Course', icon: 'fa-circle-plus' },
  { path: '/view-courses', label: 'All Courses', icon: 'fa-layer-group' },
]

const Menus = () => {
  return (
    <nav className="sidebar-nav">
      <p className="nav-section-label">Menu</p>

      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              <span className="nav-icon">
                <i className={`fas ${item.icon}`} />
              </span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-arrow">
                <i className="fas fa-chevron-right" />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-divider" />

      <div className="sidebar-promo">
        <div className="promo-icon">
          <i className="fab fa-youtube" />
        </div>
        <p className="promo-text">
          Organise your YouTube learning in one beautiful place.
        </p>
      </div>
    </nav>
  )
}

export default Menus
