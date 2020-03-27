import React, { useEffect, useState } from 'react'
import axios from 'axios'
import serviceWeather from '../services/weather'

const CountryWeather = ({ country }) => {

    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        serviceWeather.getWeather(country)
            .then(weatherData => {
                setWeatherData(weatherData)
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
            <span className='value'>{weatherData.current.wind_speed}</span>
            <br />
            <img src={weatherData.current.weather_icons} />
        </div>
    )
}

export default CountryWeather
