const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    })


    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        console.log(response.body.length)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('identifying attribute is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('addition of a blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: "Test title",
            author: "Test author",
            url: "http://www.testurl.com",
            likes: 5
        }

        const blogsBeforePost = await helper.blogsInDb()
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(blogsBeforePost.length + 1)
    })

    test('succeeds with undefined likes parameter', async () => {
        const newBlog = {
            title: "Test title",
            author: "Test author",
            url: "http://www.testurl.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    })

    test('fails with status code 400 if undefined title and url parameter', async () => {
        const newBlog = {
            author: "Test author",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})