import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = 'http://api.weatherstack.com/'

const getWeather = (country) => {

    const request = axios.get(`${baseUrl}/current?access_key=${apiKey}&query=${country.name}`)
    return request.then(response => response.data)
}

export default { getWeather }
