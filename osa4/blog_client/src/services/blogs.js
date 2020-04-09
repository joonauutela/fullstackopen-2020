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

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

export default { getAll, setToken, create }