/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// OLD FILE FOR EXCERCISE 3.12 ----------------------

require("dotenv").config()
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

    const password = process.argv[2]
    const url = `mongodb+srv://phonebook:${password}@cluster0-6n5us.mongodb.net/test?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {

    const password = process.argv[2]
    const url = `mongodb+srv://phonebook:${password}@cluster0-6n5us.mongodb.net/test?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(response => {

        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}