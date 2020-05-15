import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BLOG_URI
const url = `${baseUrl}api/users/`

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

export default { getAll }