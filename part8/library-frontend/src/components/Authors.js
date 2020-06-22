import { useQuery, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const result = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (result.data) {
      setName(result.data.allAuthors[0].name)
    }
    console.log(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show || result.loading) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, born } })
    setBorn('')
    setName('')
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={handleChange}>
            {result.data.allAuthors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          born
      <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
