import React from 'react'

const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password:
                <input
                        type="text"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login