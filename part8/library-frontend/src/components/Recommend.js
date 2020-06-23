import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_BOOKS, GET_USER } from '../queries'

const Recommend = (props) => {
    const [booksByGenre, setBooksByGenre] = useState([])

    const resultUser = useQuery(GET_USER)
    const [loadBooks, { called, loading, data }] = useLazyQuery(GET_BOOKS)

    useEffect(() => {
        if (!resultUser.loading) {
            if (resultUser.data.me !== null) {
                loadBooks({
                    variables: { genre: resultUser.data.me.favoriteGenre }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultUser.loading, loadBooks])

    useEffect(() => {
        if (data) {
            setBooksByGenre(data.allBooks)
        }
    }, [data])

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                        </th>
                    </tr>
                    {booksByGenre.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend