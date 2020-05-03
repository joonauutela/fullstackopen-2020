const notificationReducer = (state = { message: '', timeout: 0 }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const changeNotification = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                timeout
            }
        })
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        data: {
            message: '',
            timeout: 0
        }
    }
}

export default notificationReducer