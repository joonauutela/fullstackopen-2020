import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const CreateBlog = () => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blog))
    dispatch(changeNotification(`a new blog ${blog.title} by ${blog.author}`, 'success', 3))
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog