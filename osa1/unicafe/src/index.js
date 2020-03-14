import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => setGood(good + 1)
    const handleClickNeutral = () => setNeutral(neutral + 1)
    const handleClickBad = () => setBad(bad + 1)

    return (
        <div>
            <div className="feedback">
                <h1>give feedback</h1>
                <button onClick={() => handleClickGood()}>good</button>
                <button onClick={() => handleClickNeutral()}>neutral</button>
                <button onClick={() => handleClickBad()}>bad</button>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {

    const reviewsTotal = good + neutral + bad
    const reviewsAverage = (good - bad) / reviewsTotal
    const reviewsPositive = good / reviewsTotal * 100

    return (
        <div className="statistics">
            <h1>statistics</h1>
            {reviewsTotal > 0 ?
                <div>
                    <p>good {good}</p>
                    <p>neutral {neutral}</p>
                    <p>bad {bad}</p>
                    <p>all {reviewsTotal}</p>
                    <p>average {reviewsAverage}</p>
                    <p>positive {reviewsPositive} %</p>
                </div>
                : <p>No feedback given</p>
            }
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)