const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

router.get('/', async (request, response) => {
    response.status(204).end()
})

router.post('/createblog', async (request, response) => {
    const body = request.body
    let user = await User.find({ username: body.username })
    user = user[0]

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

module.exports = router