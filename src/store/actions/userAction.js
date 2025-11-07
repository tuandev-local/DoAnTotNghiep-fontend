
export const updateUserSuccess = (userInfo, token) => ({
    type: 'UPDATE_USER_SUCCESS',
    userInfo: userInfo,
    token: token,
})

export const userLoginFail = () => ({
    type: 'USER_LOGIN_FAIL'
})

export const processLogout = () => ({
    type: 'PROCESS_LOGOUT'
})

export const userLoginSuccess = (userInfo, token) => ({
    type: 'USER_LOGIN_SUCCESS',
    userInfo: userInfo,
    token: token,
})