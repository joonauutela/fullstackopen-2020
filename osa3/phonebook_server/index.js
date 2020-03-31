require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// Create new token 'post-data'
morgan.token('post-data', function (req) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

// Set up logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.send(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
            response.json(person.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</<p><p>${date}</p>`
    )
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    // "{new: true}" makes it possible to return the new object as a response
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
})