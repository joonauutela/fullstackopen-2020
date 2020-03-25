import React, { useState } from 'react'
import Filter from './components/Filter'
import ListPerson from './components/ListPerson'
import FormPerson from './components/FormPerson'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {

    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Check for duplicates
    if (!persons.some(person => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson))
    } else {
      window.alert(`${newPerson.name} is already added to the notebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(
    (person) => {
      return person.name.indexOf(filter) !== -1
    }
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
      <FormPerson
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ListPerson filteredPersons={filteredPersons} />
    </div>
  )
}

export default App