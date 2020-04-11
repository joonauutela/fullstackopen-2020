import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user }) => {

  // Sort bloglist by likes
  if (blogs.length > 0) {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} activeUser={user} />
      )}
    </div>
  )
}

export default BlogList