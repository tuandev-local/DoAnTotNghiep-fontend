
const initialState = {
    arrUser: [],
    arrRole: [],
    pendingDocument: []

}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_SUCCESS':

            return {
                ...state,
                arrUser: action.arrUser

            }

        case 'GET_USER_FAIL':
            return {
                ...state,
                arrUser: []
            }
        case 'FETCH_ROLE_SUCCESS':

            return {
                ...state,
                arrRole: action.arrRole

            }

        case 'FETCH_ROLE_FAIL':
            return {
                ...state,
                arrRole: []
            }
        case 'GET_PENDING_DOCUMENT_SUCCESS':

            return {
                ...state,
                pendingDocument: action.pendingDocument

            }

        case 'GET_PENDING_DOCUMENT_FAIL':
            return {
                ...state,
                pendingDocument: []
            }
        default:
            return state;
    }
}

export default appReducer;