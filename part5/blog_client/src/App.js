import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { continueSession, logout } from './reducers/loginReducer'
import { useSelector } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      dispatch(continueSession(loggedUserJSON))
    }
  }, [])


  const handleLogout = () => {
    dispatch(logout())
  }

  const loginForm = () => (
    <div>
      <Togglable buttonLabel='login'>
        <h2>log in to application</h2>
        <Login />
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
        />
      </Togglable>
    </div>
  )
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          {blogForm()}
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
        </div>
      }
      <BlogList
        user={user}
      />
    </div>
  )
}

export default App