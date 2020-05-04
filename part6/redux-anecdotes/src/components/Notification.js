import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


export default connect(mapStateToProps)(Notification)