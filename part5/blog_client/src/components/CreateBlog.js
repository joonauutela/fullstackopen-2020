import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'

const CreateBlog = ({ blogService }) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    await blogService.create(blogObject)
    dispatch(changeNotification(`a new blog ${blogObject.title} by ${blogObject.author}`, 'success', 3))
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