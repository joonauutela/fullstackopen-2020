var timeOuts = []

const notificationReducer = (state = { message: '', timeout: 0 }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const changeNotification = (message, timeout) => {

    if (timeOuts.length > 0) {
        clearTimeout(timeOuts[timeOuts.length - 1])
    }
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                timeout
            }
        })
        timeOuts.push(setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: {
                    message: '',
                    timeout: 0
                }
            })
        }, timeout * 1000))
    }
}
export default notificationReducer