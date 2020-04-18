import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, activeUser }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  const removeBlog = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        setIsRemoved(true)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const likeBlog = () => {
    blogService.like(blog)
  }

  const removeButton = () => {
    return activeUser.username === blog.user.username ? (
      <button onClick={() => removeBlog()}>remove</button>
    ) : null
  }

  if (isRemoved) return null

  return (
    <li className='blog'>
      <div className="primaryInfo">
        {blog.title} {blog.author}
        <button className='btnShowAll' onClick={() => setShowFullBlog(!showFullBlog)}>view</button>
      </div>
      {showFullBlog &&
        <div className='moreInfo'>
          <a href={blog.url} className='blogurl'>{blog.url}</a>
          <br />
          {blog.likes}
          <button className='btnLike' onClick={() => likeBlog()}>like</button>
          <br />
          {blog.user.name}
          <br />
          {removeButton()}
        </div>
      }
    </li>
  )
}

export default Blog
