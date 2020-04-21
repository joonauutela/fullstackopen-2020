import React, { useState } from 'react'

const CreateBlog = ({ blogService, setNotificationState }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const noteObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(noteObject)
      .then(setNotificationState({ message: `a new blog ${noteObject.title} by ${noteObject.author}`, type: 'success' }))
      .then(setTimeout(() => {
        setNotificationState({ message: null, type: null })
      }, 5000))
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