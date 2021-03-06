import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BLOG_URI
const url = `${baseUrl}api/login/`

const login = async credentials => {
  const response = await axios.post(url, credentials)
  return response.data
}

export default { login }