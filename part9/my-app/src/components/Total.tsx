import React from 'react'
import { CoursePart } from '../types'


interface ContentProps {
    courseParts: CoursePart[];
}

const Total: React.FC<ContentProps> = ({ courseParts }) => {
    return (
        <div>
            <p>
                Number of exercises{" "}
                {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}

export default Total
