export default ((state = { query: '', items: [] }, action) => {
    switch (action.type) {
        case 'SEARCH_QUERY':
            return Object.assign({}, state, { query: action.query })
        case 'SEARCH_RESULT':
            return Object.assign({}, state, { items: action.items })
        default:
            return state
    }
})