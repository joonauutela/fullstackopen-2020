const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    if (!blog.likes) blog.likes = 0

    if (blog.url && blog.title) {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
            .catch(error => next(error))
    } else {
        response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    console.log("funktiossa remove")
    Blog.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
        .catch(error => next(error))
})

module.exports = blogsRouter