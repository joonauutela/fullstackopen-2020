import React from 'react'
import User from '../components/MappedUser'

const Users = ({ users }) => {
  const padding = {
    padding: 5
  }
  return (
    <div style={padding}>
      <h2>Users</h2>
      {users.map(user =>
        <div key={user.id}><User user={user} /></div>
      )}
    </div>
  )
}

export default Users