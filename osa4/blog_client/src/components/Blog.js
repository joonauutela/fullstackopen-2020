import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, activeUser }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const removeBlog = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      try {
        await blogService.remove(blog)
        setIsRemoved(true)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const likeBlog = () => {
    blogService.like(blog)
      .then(setIsLiked(true))
      .then(setLikes(parseInt(likes) + 1))
  }

  if (isRemoved) return null;

  return (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowFullBlog(!showFullBlog)}>view</button>
      </div>
      {showFullBlog &&
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          {likes}
          {!isLiked &&
            <button onClick={() => likeBlog()}>like</button>
          }
          <br />
          {blog.user.name}
          <br />
          {activeUser !== null && activeUser.username === blog.user.username &&
            <button onClick={() => removeBlog()}>remove</button>
          }
        </div>
      }

    </div>
  )
}

export default Blog
