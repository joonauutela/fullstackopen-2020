const filterReducer = (state = { type: 'SET_FILTER', content: '' }, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        data: {
            content: filter
        }
    }
}

export default filterReducer