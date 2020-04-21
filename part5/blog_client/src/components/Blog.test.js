import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const testBlog = {
  title: 'Test title 1',
  author: 'Test author 1',
  url: 'www.testurl1.com',
  likes: 2,
  user: {
    username: 'testuser',
    name: 'testname'
  }
}
describe('Blog', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} activeUser={testBlog.user.username} handleLikeBlog={mockHandler} />
    )
  })

  test('shows only blog title and author', () => {

    const primaryInfo = component.container.querySelector('.primaryInfo')
    const moreInfo = component.container.querySelector('.moreInfo')

    expect(primaryInfo).toHaveTextContent('Test title 1')
    expect(primaryInfo).toHaveTextContent('Test author 1')
    expect(moreInfo).toEqual(null)
  })

  test('clicking view-button shows more info', () => {

    const buttonViewMore = component.getByText('view')
    fireEvent.click(buttonViewMore)
    const moreInfo = component.container.querySelector('.moreInfo')

    expect(moreInfo).toHaveTextContent('www.testurl1.com')
    expect(moreInfo).toHaveTextContent('2')
    expect(moreInfo).toHaveTextContent('testname')
  })

  test('like-button event handler is called once every click', () => {

    const buttonViewMore = component.getByText('view')
    fireEvent.click(buttonViewMore)
    const buttonlike = component.container.querySelector('.btnLike')
    console.log(prettyDOM(buttonlike))
    fireEvent.click(buttonlike)
    fireEvent.click(buttonlike)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})