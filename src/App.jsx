import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './component/Header'
import Menus from './component/Menus'
import Home from './component/Home'
import AddCourse from './component/AddCourse'
import Allcourses from './component/Allcourses'
import './App.css'

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1a1b25',
          border: '1px solid rgba(255,45,85,0.25)',
          color: '#f0f0f5',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.9rem',
        }}
      />
      <div className="app-wrapper">
        <Header />
        <div className="app-body">
          <aside className="sidebar-col">
            <Menus />
          </aside>
          <main className="main-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/view-courses" element={<Allcourses />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
