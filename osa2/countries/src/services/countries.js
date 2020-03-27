import axios from 'axios'
const baseURL = 'https://restcountries.eu/rest/v2'

const getCountries = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

export default { getCountries }
