import { gql, useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    bookCount
    born
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born,
    ) {
      id
    }
  }
  `

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const result = useQuery(ALL_AUTHORS);

  if (!props.show || result.loading) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(name + " " + born)
    editAuthor({ variables: { name, born } })
    setBorn('')
    setName('')
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
      <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
