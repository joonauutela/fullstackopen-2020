import React, { useState, useEffect } from 'react'
import './App.css'
import serviceCountries from './services/countries'
import Filter from './components/CountryFilter'
import CountryDetails from './components/CountryDetails'
import CountryWeather from './components/CountryWeather'
import List from './components/CountryList'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setfilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [countryToShow, setCountryToShow] = useState(null)


  const handleFilter = (event) => {
    setfilter(event.target.value)
    setCountryToShow(null)
  }

  const handleShowCountry = (country) => {
    console.log(country)
    setCountryToShow(country);
  }

  const filteredCountries = countries.filter(
    (country) => {
      return country.name.toLowerCase().indexOf(filter) !== -1
    }
  )

  useEffect(() => {
    serviceCountries.getCountries()
      .then(countriesData => {
        setCountries(countriesData)
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
          <CountryDetails country={countryToShow} />
          <CountryWeather country={countryToShow} />
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
