require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const Person = require('./models/person')
const bodyParser = require('body-parser')
const errorHandler = require('./utils/errorHandler')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const url =
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.6n5us.mongodb.net/Cluster0>?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

// Create new token 'post-data'
morgan.token('post-data', function (req) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

// Set up logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.get('/api/persons', (request, response, next) => {
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

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const date = new Date()
    Person.find({})
        .then(persons => {
            response.send(
                `<p>Phonebook has info for ${Object.keys(persons).length} people</<p><p>${date}</p>`
            )
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})