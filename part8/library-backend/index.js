const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const uuid = require('uuid/v1')

const MONGODB_URI = 'mongodb+srv://admin:@cluster0-6n5us.mongodb.net/Cluster0?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }
  
  type Mutation {
      addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
      ): Book

      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
  }
`

const resolvers = {
    Query: {
        authorCount: async () => {
            await Author.remove({})
            await Book.remove({})
            return 1
        },
        bookCount: () => Book.collection.countDocuments(),
        allBooks: (root, args) => {
            return Book.find({}).populate('author')
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            const books = await Book.find({})

            // Assign bookCount
            authors.map(author => {
                let bookCount = 0
                books.map(book => {
                    if (book.author.toString() === author.id) bookCount++
                })
                author.bookCount = bookCount
            })
            return authors
        }
    },
    Mutation: {
        addBook: (root, args) => {
            Author.findOne({ name: args.author })
                .then(result => {
                    // No author in db
                    if (result === null) {
                        const author = new Author({ name: args.author })
                        const book = new Book({ ...args, author: author })
                        author.save()
                        book.save()
                        return book
                    }
                    // Author in db
                    else {
                        const book = new Book({ ...args, author: result })
                        book.save()
                        return book
                    }
                })
        },
        editAuthor: (root, args) => {
            const author = authors.find(a => {
                return a.name === args.name
            })
            if (!author) {
                return null
            }

            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a);
            return updatedAuthor;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})