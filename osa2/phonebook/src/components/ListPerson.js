import React from 'react'

export default function ListPerson({ filteredPersons }) {
    return (
        <div>
            {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}
