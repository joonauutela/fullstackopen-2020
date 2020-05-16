import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = () => {
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const filteredBlogArr = blogs.filter((blog) => { return blog.id === id })
  const filteredBlog = filteredBlogArr[0]

  if (!filteredBlog) return null
  return (
    <div>
      <h2>{filteredBlog.title}</h2>
      <a href={filteredBlog.url}>{filteredBlog.url}</a>
      <p>{filteredBlog.likes} likes <button>like</button></p>
      <p>added by {filteredBlog.author}</p>
    </div>
  )
}

export default Blog