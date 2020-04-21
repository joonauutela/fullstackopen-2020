import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, handleLikeBlog }) => {

  // Sort bloglist by likes
  if (blogs.length > 0) {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  return (
    <div>
      <ul id='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.name} blog={blog} activeUser={user} handleLikeBlog={handleLikeBlog} />
        )}
      </ul>
    </div>
  )
}

export default BlogList