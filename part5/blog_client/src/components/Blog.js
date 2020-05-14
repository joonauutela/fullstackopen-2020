import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, activeUser }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)

  const dispatch = useDispatch()

  const removeButton = () => {
    if (activeUser) {
      return activeUser.username === blog.user.username ? (
        <button id='remove-button' onClick={() => dispatch(removeBlog(blog))}>remove</button>
      ) : null
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    activeUser: PropTypes.object,
    handleLikeBlog: PropTypes.func
  }

  return (
    <li key={blog.id} id={blog.title} className='blog'>
      <div className="primaryInfo">
        {blog.title} {blog.author}
        <button id='view-button' className='btnShowAll' onClick={() => setShowFullBlog(!showFullBlog)}>view</button>
      </div>
      {showFullBlog &&
        <div className='moreInfo'>
          <a href={blog.url} className='blogurl'>{blog.url}</a>
          <br />
          {blog.likes}
          <button id='like-button' className='btnLike' onClick={() => dispatch(likeBlog(blog))}>like</button>
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
