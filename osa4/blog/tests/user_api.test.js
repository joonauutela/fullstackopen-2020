const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')


describe('when there is initially some users saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        passwordHash = await bcrypt.hash('password', 10)
        const userObject = new User({ username: 'root', name: 'testname', passwordHash })
        await userObject.save()
    })

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('addition of a user', () => {
    test('succeeds with valid data', async () => {
        const newuser = {
            name: "kalle makinen",
            username: "kallmak",
            password: "124542"
        }

        const usersBeforePost = await helper.usersInDb()
        await api
            .post('/api/users')
            .send(newuser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfterPost = await helper.usersInDb()
        expect(usersAfterPost).toHaveLength(usersBeforePost.length + 1)
    })

    test('fails with status code 400 if password < 3 letters', async () => {
        const newuser = {
            name: "kalle makinen",
            username: "kallmak2",
            password: "km"
        }

        await api
            .post('/api/users')
            .send(newuser)
            .expect(400)
    })

    test('fails with status code 400 if username < 3 letters', async () => {
        const newuser = {
            name: "kalle makinen",
            username: "km",
            password: "123456"
        }

        await api
            .post('/api/users')
            .send(newuser)
            .expect(400)
    })

    test('fails with status code 400 if undefined username', async () => {
        const newUser = {
            name: "kalle makinen",
            password: "123456"
        }

        await api
            .post('/api/blogs')
            .send(newUser)
            .expect(400)
    })

    test('fails with status code 400 if undefined password', async () => {
        const newUser = {
            name: "kalle makinen",
            username: "kalmak"
        }

        await api
            .post('/api/blogs')
            .send(newUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})