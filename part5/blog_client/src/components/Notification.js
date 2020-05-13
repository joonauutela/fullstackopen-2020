/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  switch (notification.messageType) {
    case 'error':
      return (
        <div className="error">
          {notification.message}
        </div>
      )
    case 'success':
      return (
        <div className="success">
          {notification.message}
        </div>
      )
    default:
      return null
  }

}

export default Notification