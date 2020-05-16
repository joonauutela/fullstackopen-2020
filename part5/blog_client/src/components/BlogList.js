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
      <div id='blogs' style={{ paddingTop: 10 }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} activeUser={user} handleLikeBlog={handleLikeBlog} />
        )}
      </div>
    </div >
  )
}

export default BlogList