import React from 'react'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import CreateBlog from '../components/CreateBlog'
import blogService from '../services/blogs'

const BlogView = ({ user }) => {

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlog blogService={blogService} />
      </Togglable>
    </div>
  )
  return (
    <div>
      {user !== null &&
        <div>
          {blogForm()}
        </div>
      }
      <BlogList user={user} />
    </div>
  )
}

export default BlogView