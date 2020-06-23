import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem('library-user-token')
    if (localStorageToken) {
      setToken(localStorageToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBookTitle = subscriptionData.data.bookAdded.title
      window.alert(`new book: '${addedBookTitle}' added`)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null
          ?
          <button onClick={() => setPage('login')}>login</button>
          :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App