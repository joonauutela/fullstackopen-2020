import React from 'react'

export default function CountryDetails({ country }) {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} height="90" />
        </div>
    )
}
