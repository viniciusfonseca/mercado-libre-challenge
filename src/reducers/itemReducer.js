export default ((state = {}, action) => {
    switch (action.type) {
        case 'ITEM': {
            return Object.assign({}, action.item)
        }
        default:
            return state
    }
})