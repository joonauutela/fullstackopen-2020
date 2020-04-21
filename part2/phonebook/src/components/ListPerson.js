import React from 'react'

const ListPerson = ({ persons, filter, handleRemove }) => {

    const filteredPersons = persons.filter(
        (person) => {
            return person.name.indexOf(filter) !== -1
        }
    )

    return (
        <div>
            {filteredPersons.map(person =>
                <p key={person.id}>{person.name} {person.number}
                    <button onClick={() => handleRemove(person)}>delete</button>
                </p>)}
        </div>
    )
}

export default ListPerson