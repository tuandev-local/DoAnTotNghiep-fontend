
const initialState = {
    isLoggedIn: false,
    userInfo: null,
    token: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':

            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                token: action.token,

            }

        case 'USER_LOGIN_FAIL':
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                token: null
            }
        case 'PROCESS_LOGOUT':

            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                token: null,

            }
        case 'UPDATE_USER_SUCCESS':

            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                token: action.token,

            }
        default:
            return state;
    }
}

export default appReducer;