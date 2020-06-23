import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries'

const Books = (props) => {

  const result = useQuery(GET_BOOKS)
  const [allBooks, setAllBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  const genres = ['refactoring', 'agile', 'patterns', 'design', 'crime', 'scifi']

  useEffect(() => {
    if (result.data) {
      setAllBooks(result.data.books)
      setFilteredBooks(result.data.books)
    }
  }, [result.data])

  const filterBooks = (genre) => {
    const filteredBooks = allBooks.filter(book => {

      const filteredGenres = book.genres.filter(comparedGenre => {
        return comparedGenre === genre
      })
      if (filteredGenres.length > 0) {
        return true
      }
      return false
    })
    setFilteredBooks(filteredBooks)
  }

  if (!props.show || result.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="genres">
        {genres.map(genre =>
          <button key={genre} onClick={() => filterBooks(genre)}>{genre}</button>
        )}
      </div>
    </div>
  )
}

export default Books