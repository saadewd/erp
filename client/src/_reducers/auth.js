const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true
}
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'USER_LOADED':
            
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                // user:payload.user
            }
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                user:payload.mail.user,
                isAuthenticated: true,
                loading: false
            }
            
            break

        case 'REGISTER_FAIL':
        case 'LOG_OUT':
        case 'LOGIN_FAIL':
            // case 'AUTH_ERROR':
            localStorage.removeItem('token')
            return {
                ...state,
                user:{},
                token: null,
                isAuthenticated: false,
                loading: true
            }





        default:
            return state
    }
}