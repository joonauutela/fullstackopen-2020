import React from 'react'

interface ContentProps {
    courseParts: Array<{ name: string; exerciseCount: number }>;
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
