import React, { useEffect } from 'react'
import Togglable from './components/Togglable'
import Login from './components/Login'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { continueSession, logout } from './reducers/loginReducer'
import { getUsers } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import AllBlogsView from './views/Blogs'
import AllUsersView from './views/Users'
import UserView from './views/User'
import BlogView from './views/Blog'

const App = () => {

  const padding = {
    padding: 5
  }

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      dispatch(continueSession(loggedUserJSON))
    }
  }, [])

  const loginForm = () => (
    <div>
      <Togglable buttonLabel='login'>
        <h2>log in to application</h2>
        <Login />
      </Togglable>
    </div>
  )

  const logoutButton = () => (
    <p>{loggedUser.name} logged in <button onClick={() => dispatch(logout())}>logout</button></p>
  )

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Notification />
        <h2>blogs</h2>
        {loggedUser === null ?
          loginForm() : logoutButton()
        }
      </div>
      <Switch>
        <Route path="/users/:id">
          <UserView users={users} />
        </Route>
        <Route path="/blogs/:id">
          <BlogView />
        </Route>
        <Route path="/users">
          <AllUsersView users={users} />
        </Route>
        <Route path="/">
          <AllBlogsView user={loggedUser} />
        </Route>
      </Switch>

    </Router>
  )
}

export default App