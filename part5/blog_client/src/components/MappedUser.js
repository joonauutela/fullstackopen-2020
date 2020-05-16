import React from 'react'
import { Link } from 'react-router-dom'

const MappedUser = ({ user }) => {
  const padding = {
    background: '#d5dbdb',
    width: '30%',
  }
  return (
    <div key={user.id} style={padding}>
      <p><b>username: </b><Link to={`/users/${user.id}`}>{user.username}</Link></p>
      <p><b>Blogs created:</b> {user.blogs.length}</p>
    </div>
  )
}

export default MappedUser