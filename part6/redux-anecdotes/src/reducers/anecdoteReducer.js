import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.votedAnecdote.id
      const votedAnecdote = action.data.votedAnecdote
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = anecdote
    const id = anecdote.id
    votedAnecdote.votes++
    await anecdoteService.update(id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { votedAnecdote }
    })
  }
}

export default anecdoteReducer