import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

interface Props {
    courseParts: Array<CoursePart>;
}

const Content: React.FC<Props> = ({ courseParts }) => {

    return (
        <div>
            {courseParts.map(part => {
                return <Part part={part} key={part.name} />
            })}

        </div>
    )
}

export default Content