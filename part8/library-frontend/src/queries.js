import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query getBooks($genre: String){
    books(genre: $genre) {
      title
      author{
        name
      }
      published
      genres
    }
  }
`
export const GET_BOOK_DETAILS = gql`
  query bookDetails($title: String){
    books(name: $name) {
      title
      author{
        name
      }
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

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      favoriteGenre
      username
    }
  }
`


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
    }
  }
`