
const initialState = {
    arrUser: [],
    arrRole: [],
    manageDocuments: []

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
                manageDocuments: action.manageDocuments

            }

        case 'GET_PENDING_DOCUMENT_FAIL':
            return {
                ...state,
                manageDocuments: []
            }
        default:
            return state;
    }
}

export default appReducer;