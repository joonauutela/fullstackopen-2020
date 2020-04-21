import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

    const votesEmpty = new Array(props.anecdotes.length).fill(0);

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(votesEmpty);
    const [maxValueID, setMaxValueID] = useState(0);

    const handleClickQuote = () => {
        const randomId = Math.floor(Math.random() * anecdotes.length)
        setSelected(randomId)
    }

    const handleClickVote = () => {
        // Set new vote count
        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)

        // Set index with most votes
        const maxValue = Math.max.apply(null, votes)
        setMaxValueID(votes.indexOf(maxValue))
    }

    return (
        <div className="container">
            <h1>Anecdote of the day</h1>
            <div>
                <p>{props.anecdotes[selected]}</p>
                <p>{votes[selected]}</p>
            </div>
            <div>
                <button onClick={() => handleClickVote()}>vote</button>
                <button onClick={() => handleClickQuote()}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            <div>
                <p>{props.anecdotes[maxValueID]}</p>
                <p>has {votes[maxValueID]} votes</p>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)