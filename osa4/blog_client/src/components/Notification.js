import React from 'react'
import '../App.css'

const Notification = ({ message, messageType }) => {

    switch (messageType) {
        case 'error':
            return (
                <div className="error">
                    {message}
                </div>
            )
        case 'success':
            return (
                <div className="success">
                    {message}
                </div>
            )
        default:
            return null
    }

}

export default Notification