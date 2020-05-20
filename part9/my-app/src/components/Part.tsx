import React from 'react'
import { CoursePart } from '../types'

interface Props {
    part: CoursePart;
}

const Part: React.FC<Props> = ({ part }) => {

    function typeCheck() {
        switch (part.name) {
            case "Fundamentals":
                return (
                    <div>
                        <h4>{part.name}</h4>
                        <p>{part.description}</p>
                    </div>
                )
            case "Using props to pass data":
                return (
                    <div>
                        <h4>{part.name}</h4>
                        <p>{part.groupProjectCount}</p>
                    </div>
                )
            case "Deeper type usage":
                return (
                    <div>
                        <h4>{part.name}</h4>
                        <p>{part.description}</p>
                        <p>{part.exerciseSubmissionLink}</p>
                    </div>
                )
            case "Name here":
                return (
                    <div>
                        <h4>{part.name}</h4>
                        <p>{part.description}</p>
                        <p>{part.exerciseCount}</p>
                    </div>
                )
            default:
                break;
        }
    }
    return <div>{typeCheck()}</div>
}


export default Part