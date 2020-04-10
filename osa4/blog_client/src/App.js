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
  const [messageType, setMessageType] = useState(null)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const noteObject = {
      title: title,
      author: author,
      url: url
    }
    blogFormRef.current.toggleVisibility()
    blogService.create(noteObject)
      .then(setMessageType('success'))
      .then(setMessage(`a new blog ${noteObject.title} by ${noteObject.author}`))
      .then(setTimeout(() => {
        setMessageType(null)
        setMessage('')
      }, 5000))
  }

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
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessageType(null)
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <h2>log in to application</h2>
      <Notification message={message} messageType={messageType} />
      <Login
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <Notification message={message} messageType={messageType} />
        <CreateBlog
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
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
      />
    </div>
  )
}

export default App