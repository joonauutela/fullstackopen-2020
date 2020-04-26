import React from 'react'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Notification } from './components/Notification'
import Filter from './components/Filter'
import store from './store'

const App = () => {
  const handleClick = () => {
    console.log(store.getState())
  }
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <button onClick={() => handleClick()}>click me</button>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App