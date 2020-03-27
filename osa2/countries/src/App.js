import React, { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'
import CountryWeather from './components/CountryWeather'
import List from './components/CountryList'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setfilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [countryToShow, setCountryToShow] = useState(null)
  const baseURL = 'https://restcountries.eu/rest/v2'

  const handleFilter = (event) => {
    setfilter(event.target.value)
    setCountryToShow(null)
  }

  const handleShowCountry = (country) => {
    setCountryToShow(country);
  }

  const filteredCountries = countries.filter(
    (country) => {
      return country.name.toLowerCase().indexOf(filter) !== -1
    }
  )

  useEffect(() => {
    axios
      .get(`${baseURL}/all`)
      .then(response => {
        setCountries(response.data)
        setIsLoading(false)
      })
  }, [])


  return (
    <div>
      <Filter
        filter={filter}
        handleFilter={handleFilter} />

      {countryToShow !== null
        ?
        <div>
          <CountryDetails country={filteredCountries[0]} />
          <CountryWeather country={filteredCountries[0]} />
        </div>
        :
        <List
          countryToShow={countryToShow}
          handleShowCountry={handleShowCountry}
          filter={filter}
          filteredCountries={filteredCountries}
          isLoading={isLoading} />
      }
    </div>
  );
}

export default App;
