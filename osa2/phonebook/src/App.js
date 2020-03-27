import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import ListPerson from './components/ListPerson'
import FormPerson from './components/FormPerson'
import servicePersons from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {

    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    // Check for duplicates
    if (!persons.some(person => person.name === newPerson.name)) {

      createPerson(newPerson)

    } else if (window.confirm(`${newPerson.name} is already added to the notebook, replace the older number with a new one?`)) {

      const personToReplace = persons.filter(person => person.name === newPerson.name)
      updatePerson(personToReplace, newPerson)

    }
  }

  const createPerson = (newPerson) => {
    servicePersons.createPerson(newPerson)
      .then(() => {
        servicePersons.getPersons()
          .then(response => {
            setPersons(response)
          })
      })
  }

  const updatePerson = (personToReplace, newPerson) => {

    servicePersons.updatePerson(personToReplace[0].id, newPerson)
      .then(() => {
        servicePersons.getPersons()
          .then(response => {
            setPersons(response)
          })
      })

  }

  useEffect(() => {
    servicePersons.getPersons()
      .then(response => {
        setPersons(response)
        setIsLoading(false)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(persons)
    setFilter(event.target.value)
  }

  const handleRemove = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      servicePersons.removePerson(personToRemove.id)
        .then(() => {
          setPersons(persons.filter(person => person !== personToRemove))
        })
    }
  }

  if (isLoading) return null;

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
      <ListPerson persons={persons} filter={filter} handleRemove={handleRemove} />
    </div>
  )
}

export default App