import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = ({ users }) => {

  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const user = users.find(u => u.id === id)
  const userBlogs = blogs.filter((blog) => { return blog.user.id === id })
  console.log(userBlogs[0])

  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User