import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, activeUser, handleLikeBlog }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const likeBlog = async () => {
    await handleLikeBlog(blog)
    setLikes(parseInt(likes) + 1)
  }

  const removeButton = () => {

    if (activeUser) {
      return activeUser.username === blog.user.username ? (
        <button id='remove-button' onClick={() => removeBlog()}>remove</button>
      ) : null
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    activeUser: PropTypes.object,
    handleLikeBlog: PropTypes.func
  }


  if (isRemoved) return null

  return (
    <li id={blog.title} className='blog'>
      <div className="primaryInfo">
        {blog.title} {blog.author}
        <button id='view-button' className='btnShowAll' onClick={() => setShowFullBlog(!showFullBlog)}>view</button>
      </div>
      {showFullBlog &&
        <div className='moreInfo'>
          <a href={blog.url} className='blogurl'>{blog.url}</a>
          <br />
          {likes}
          <button id='like-button' className='btnLike' onClick={() => likeBlog()}>like</button>
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
