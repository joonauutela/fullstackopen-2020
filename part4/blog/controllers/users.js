const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || !body.username) {
        return response.status(400).json({
            error: 'information missing'
        }).end()
    }
    if (body.password.length < 3 || body.username.length < 3) {
        return response.status(400).json({
            error: 'username or password too short'
        }).end()
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { id: 1, title: 1, url: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))

})

module.exports = usersRouter