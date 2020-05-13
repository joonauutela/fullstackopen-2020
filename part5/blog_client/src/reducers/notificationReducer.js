/* eslint-disable indent */
const initialState = {
  message: '',
  messageType: null,
  timeout: 0
}
const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action.data)
      return action.data
    default:
      return state
  }
}

export const changeNotification = (message, messageType, timeout) => {

  return async dispatch => {
    console.log('moimoimoi!')
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        messageType,
        timeout
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          message: '',
          messageType: null,
          timeout: 0
        }
      })
    }, timeout * 1000)
  }
}

export default notificationReducer