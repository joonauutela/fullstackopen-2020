import React from 'react'

const Notification = ({ message, messageType }) => {

    switch (messageType) {
        case null:
            return null;
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
    }

}

export default Notification