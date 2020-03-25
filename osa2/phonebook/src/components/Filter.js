import React from 'react'

export default function Filter({ handleFilter }) {
    return (
        <div>
            filter shown with <input onChange={handleFilter} />
        </div>
    )
}
