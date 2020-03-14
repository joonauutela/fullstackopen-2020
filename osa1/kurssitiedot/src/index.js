import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const course = 'Half Stack application development'

    // Turn course data into json-format
    const courseInfo = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
    return (
        <div>
            <Header course={course} />
            <Content courseInfo={courseInfo} />
            <Total courseInfo={courseInfo} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>

            <Part courseInfo={props.courseInfo[0]} />
            <Part courseInfo={props.courseInfo[1]} />
            <Part courseInfo={props.courseInfo[2]} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.courseInfo.name} {props.courseInfo.exercises}
        </p>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.courseInfo[0].exercises + props.courseInfo[1].exercises + props.courseInfo[2].exercises}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))