/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'EDIT_BLOG':
      const editedBlog = action.data
      return state.map(blog =>
        blog.id !== action.data.id ? blog : editedBlog
      )
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = blog
    likedBlog.likes++
    likedBlog.user = {
      username: likedBlog.user.username,
      name: likedBlog.user.name,
      id: likedBlog.user.id
    }
    await blogService.update(blog, likedBlog)
    dispatch({
      type: 'EDIT_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })
    }
  }
}

export const addComment = (blog, content) => {
  return async dispatch => {
    const savedComment = await blogService.addComment(blog.id, content)
    const comment = {
      content,
      id: savedComment.id
    }
    const newComments = blog.comments.concat(comment)
    const newBlog = blog
    newBlog.comments = newComments
    dispatch({
      type: 'EDIT_BLOG',
      data: newBlog
    })
  }
}

export default blogReducer