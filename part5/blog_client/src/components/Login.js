/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {

  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default Login