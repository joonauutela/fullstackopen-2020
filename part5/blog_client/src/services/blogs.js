/* eslint-disable no-undef */
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BLOG_URI
const url = `${baseUrl}api/blogs/`

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newBlog, config)
  return response.data
}

const remove = async blogToRemove => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${url}${blogToRemove.id}`, config)
  return request.data
}

const update = async (blog, newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${url}/${blog.id}`, newBlog, config)
  return response.data
}

export default { getAll, setToken, create, remove, update }