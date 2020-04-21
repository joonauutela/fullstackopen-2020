import React from 'react'

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {

    const totalExcercises = parts.reduce((previousPart, currentPart) => previousPart + currentPart.exercises, 0);

    return (
        <div>
            <p><b>total of {totalExcercises} exercises</b></p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;