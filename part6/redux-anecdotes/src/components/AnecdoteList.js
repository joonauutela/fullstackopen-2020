import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, clearNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(
        (anecdote) => {
            return anecdote.content.toLowerCase().indexOf(filter.content) !== -1
        }
    )

    const vote = (id) => {
        const anecdoteToVote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id))
        dispatch(changeNotification(`You voted anecdote: ${anecdoteToVote.content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    if (anecdotes.length > 0) {
        anecdotes.sort((a, b) => {
            return b.votes - a.votes
        })
    }
    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
