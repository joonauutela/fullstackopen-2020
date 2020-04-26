import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.message === '') return null

  return (
    <div style={style}>
      <h2>{notification.message}</h2>
    </div>
  )
}