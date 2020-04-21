import React from 'react'
import CountryDetails from './CountryDetails'
import CountryWeather from './CountryWeather'

export default function CountryList({ countryToShow, handleShowCountry, filter, isLoading, filteredCountries }) {

    if (isLoading || filter === "") return null;
    console.log(filteredCountries.length)
    console.log(process.env.REACT_APP_API_KEY);

    return (
        <div>
            {filteredCountries.length > 10
                ? <p>Too many matches, specify another filter!</p>
                : filteredCountries.length === 1
                    ?
                    <div>
                        <CountryDetails country={filteredCountries[0]} />
                        <CountryWeather country={filteredCountries[0]} />
                    </div>
                    : filteredCountries.map(country =>
                        <p key={country.name}>{country.name}
                            <button key={country.name} onClick={() => handleShowCountry(country)}>show</button>
                        </p>
                    )
            }

        </div>
    )
}
