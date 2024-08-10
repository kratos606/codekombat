const loginRequest = () => {
    return {
        type: 'LOGIN_REQUEST'
    }
}
const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
}
const loginFailure = (error) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: error
    }
}
const logout = () => {
    return {
        type: 'LOGOUT'
    }
}
export { loginRequest, loginSuccess, loginFailure, logout }