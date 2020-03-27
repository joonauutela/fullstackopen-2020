import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryWeather = ({ country }) => {

    const apiKey = process.env.REACT_APP_API_KEY

    const baseUrl = 'http://api.weatherstack.com/'
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios
            .get(`${baseUrl}/current?access_key=${apiKey}&query=${country.name}`)
            .then(response => {
                console.log(response.data.location)
                setWeatherData(response.data)
            })
    }, [])

    if (weatherData.length === 0) return null

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <span className='key'>Temperature: </span>
            <span className='value'>{weatherData.current.temperature}</span>
            <br />
            <span className='key'>Wind: </span>
            <span className='value'>{weatherData.current.wind}</span>
            <br />
            <img src={weatherData.current.weather_icons} />
        </div>
    )
}

export default CountryWeather
