/* eslint-disable no-undef */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joona Uutela',
      username: 'testuser',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.contains('login').click()
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Joona Uutela logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      const testblogTitle = 'testtitle'
      const testBlogAuthor = 'testauthor'
      cy.contains('new blog').click()
      cy.get('#title').type(testblogTitle)
      cy.get('#author').type(testBlogAuthor)
      cy.get('#url').type('testurl')
      cy.get('#submit-button').click()

      cy.contains('new blog').click()
      cy.contains(`a new blog ${testblogTitle} by ${testBlogAuthor}`)
    })

    it('A blog can be liked', function () {
      cy.contains('#view-button').click()
    })
  })
})