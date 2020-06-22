import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author{
      name
    }
    published
    genres
  }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    bookCount
    born
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born,
    ) {
      id
    }
  }
  `