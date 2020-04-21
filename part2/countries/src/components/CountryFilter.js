import React from 'react'

export default function CountryFilter({ handleFilter }) {

    return (
        <div>
            find countries<input onChange={handleFilter} />
        </div>
    )
}
