import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const id = useParams().id
  const filteredBlogArr = blogs.filter((blog) => { return blog.id === id })
  const filteredBlog = filteredBlogArr[0]

  const handleChange = (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(filteredBlog, comment))
  }

  if (!filteredBlog) return null
  return (
    <div>
      <h2>{filteredBlog.title}</h2>
      <a href={filteredBlog.url}>{filteredBlog.url}</a>
      <p>{filteredBlog.likes} likes <button onClick={() => dispatch(likeBlog(filteredBlog))}>like</button></p>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          id='comment'
          type="text"
          name="Title"
          onChange={handleChange}
        />
        <button id='submit-button' type="submit">create</button>
      </form>
      <ul>
        {filteredBlog.comments.map(comment => <li key={comment.content}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Blog