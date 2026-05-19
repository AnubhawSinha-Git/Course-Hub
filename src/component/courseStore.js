const KEY = 'coursehub_v1'

export const getYouTubeThumbnail = (url) => {
  try {
    const u = new URL(url)
    let id = null
    if (u.hostname.includes('youtube.com')) id = u.searchParams.get('v')
    else if (u.hostname === 'youtu.be') id = u.pathname.slice(1)
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  } catch {}
  return null
}

export const getYouTubeVideoId = (url) => {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v')
    if (u.hostname === 'youtu.be') return u.pathname.slice(1)
  } catch {}
  return null
}

export const loadCourses = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const saveCourses = (courses) => {
  localStorage.setItem(KEY, JSON.stringify(courses))
}

export const addCourse = (course) => {
  const courses = loadCourses()
  const newCourse = {
    ...course,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  }
  courses.unshift(newCourse)
  saveCourses(courses)
  return newCourse
}

export const deleteCourse = (id) => {
  saveCourses(loadCourses().filter((c) => c.id !== id))
}

export const updateCourse = (id, updates) => {
  saveCourses(loadCourses().map((c) => (c.id === id ? { ...c, ...updates } : c)))
}
