/* eslint-disable indent */
import blogService from '../services/blogs'
import loginService from '../services/login'
import { changeNotification } from '../reducers/notificationReducer'

const userReducer = (state = null, action) => {

  switch (action.type) {
    case 'LOG_IN':
      return action.data.user
    case 'LOG_OUT':
      return action.data.user
    default:
      return state
  }
}

export const login = (username, password) => {

  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: {
          user
        }
      })
    } catch (exception) {
      dispatch(changeNotification('wrong username or password', 'error', 3))
    }
  }
}

export const continueSession = (loggedUserJSON) => {
  const user = JSON.parse(loggedUserJSON)
  blogService.setToken(user.token)
  return {
    type: 'LOG_IN',
    data: {
      user
    }
  }
}

export const logout = () => {
  blogService.setToken(null)
  window.localStorage.clear()
  return {
    type: 'LOG_OUT',
    data: {
      user: null
    }
  }
}


export default userReducer