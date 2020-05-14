import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user, handleLikeBlog }) => {

  const blogs = useSelector(state => state.blogs)

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
          <Blog key={blog.id} blog={blog} activeUser={user} handleLikeBlog={handleLikeBlog} />
        )}
      </ul>
    </div>
  )
}

export default BlogList