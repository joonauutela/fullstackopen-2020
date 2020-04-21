import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationState, setNotificationState] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationState({ message: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotificationState({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLikeBlog = (blog) => {
    const likedBlog = blog
    likedBlog.likes++
    blogService.update(blog, likedBlog)
  }

  const loginForm = () => (
    <div>
      <Togglable buttonLabel='login'>
        <h2>log in to application</h2>
        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlog
          blogService={blogService}
          setNotificationState={setNotificationState}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <Notification message={notificationState.message} messageType={notificationState.type} />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          {blogForm()}
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
        </div>
      }
      <BlogList
        blogs={blogs}
        user={user}
        handleLikeBlog={handleLikeBlog}
      />
    </div>
  )
}

export default App