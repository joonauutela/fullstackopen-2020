const notificationReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const changeNotification = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        data: {
            message,
        }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        data: {
            message: ''
        }
    }
}

export default notificationReducer